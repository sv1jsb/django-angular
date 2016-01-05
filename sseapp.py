# _*_ coding: utf-8 _*_
from sse import Sse
import json
import time
import redis
import uwsgi
from bson import ObjectId
from pymongo import MongoClient
from django_angular.settings import REDIS_SSE_CHANNEL, MONGO_DB_NAME


def application(e, start_response):
    session = Sse()
    # set retry to 10 sec
    session.set_retry(10000)

    # connect to redis
    redis_con = redis.StrictRedis()
    pubsub = redis_con.pubsub()
    pubsub.subscribe(REDIS_SSE_CHANNEL)

    # connect to mongo
    mongo = MongoClient()
    db = mongo[MONGO_DB_NAME]

    headers = []
    headers.append(('Content-Type', 'text/event-stream'))
    headers.append(('Cache-Control', 'no-cache'))
    start_response('200 OK', headers)
    sse_fd = uwsgi.connection_fd()
    while uwsgi.is_connected(sse_fd):
        time.sleep(1)
        session.flush()
        message = pubsub.get_message(ignore_subscribe_messages=True)
        if message:
            msg = json.loads(message['data'])
            msg_type = msg.keys()[0]
            msg_data = msg.values()[0]
            if msg_type != "post.deleted":
                post = db.post.find_one({"_id": ObjectId(msg_data)})
                author = db.user.find_one({"_id": ObjectId(post['author'])})
                ret = {
                    "id": str(post["_id"]),
                    "content": post["content"],
                    "author": {
                        "id": str(author["_id"]),
                        "username": author["username"],
                        "first_name": author.get("first_name", None),
                        "last_name": author.get("last_name", None),
                        "tagline": author.get("tagline", None)
                    }
                }
            else:
                ret = {"id": msg_data}
            session.add_message(msg_type, json.dumps(ret))
        else:
            session.add_message('p', '')
        yield str(session)
