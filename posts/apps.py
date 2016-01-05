# -*- coding: utf-8 -*-
from django.apps import AppConfig
from django.conf import settings


class PostsConfig(AppConfig):
    """
    PostsConfig for posts app
    """
    name = 'posts'
    verbose_name = "Posts application"

    def ready(self):
        if settings.ENABLE_SSE:
            import redis
            self.redis_con = redis.StrictRedis()
