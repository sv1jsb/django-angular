# _*_ coding: utf-8 _*_
from django.apps import AppConfig


class MongoAuthConfig(AppConfig):
    """
    MongoAuthConfig for mongo_auth app
    """
    name = 'mongo_auth'
    verbose_name = "Authentication with Mongo"