# -*- coding: utf-8 -*-
from django.apps import AppConfig
import redis

class PostsConfig(AppConfig):
    """
    PostsConfig for posts app
    """
    name = 'posts'
    verbose_name = "Posts application"

    def ready(self):
        self.redis_con = redis.StrictRedis()
