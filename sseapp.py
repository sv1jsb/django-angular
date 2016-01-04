# _*_ coding: utf-8 _*_
from sse import Sse
import json
import time
import redis
from bson import ObjectId
from pymongo import MongoClient


def application(e, start_response):
    print e
    # create the SSE session
    session = Sse()
    # prepare HTTP headers
    redis_con = redis.StrictRedis()
    pubsub = redis_con.pubsub()
    pubsub.subscribe('new_post')
    mongo = MongoClient()
    db = mongo.django_angular
    headers = []
    headers.append(('Content-Type','text/event-stream'))
    headers.append(('Cache-Control','no-cache'))
    start_response('200 OK', headers)
    # enter the loop
    while True:
        time.sleep(1)
        message = pubsub.get_message(ignore_subscribe_messages=True)
        if message and message['type'] == 'message':
            post = db.post.find_one({"_id": ObjectId(message['data'])})
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
            session.add_message('message', json.dumps(ret))
            yield str(session)


