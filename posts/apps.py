# -*- coding: utf-8 -*-
from django.apps import AppConfig
from .models import Post

MODELS = {'post': Post}


class PostsConfig(AppConfig):
    """
    PostsConfig for posts app
    """
    name = 'posts'
    verbose_name = "Posts application"

    def get_model(self, model_name):
        return MODELS[model_name]
