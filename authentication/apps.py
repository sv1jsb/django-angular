# -*- coding: utf-8 -*-
from django.apps import AppConfig
from .models import User

MODELS = {'user': User}


class AuthenticationConfig(AppConfig):
    """
    AuthenticationConfig for authentication app
    """
    name = 'authentication'
    verbose_name = "Authentication application"

    def get_model(self, model_name):
        return MODELS[model_name]
