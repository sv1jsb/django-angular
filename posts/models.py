# coding=utf-8
from datetime import datetime
from mongoengine import Document, ReferenceField, StringField, DateTimeField, CASCADE
from authentication.models import User


class Post(Document):
    author = ReferenceField(User, required=True, reverse_delete_rule=CASCADE)
    content = StringField(max_length=240, required=True)

    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField()

    def __unicode__(self):
        return u'{0}'.format(self.content)
