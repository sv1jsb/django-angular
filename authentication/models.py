# coding=utf-8
from mongoengine import StringField, DateTimeField
from datetime import datetime
from mongo_auth.models import AbstractUser


class User(AbstractUser):
    tagline = StringField(max_length=140, required=False)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField()


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


