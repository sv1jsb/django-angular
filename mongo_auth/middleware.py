# coding=utf-8
from django.utils.functional import SimpleLazyObject
from mongo_auth import get_user as mongo_auth_get_user


def get_user(request):
    if not hasattr(request, '_cached_user'):
        request._cached_user = mongo_auth_get_user(request)
    return request._cached_user


class AuthenticationMiddleware(object):
    def process_request(self, request):
        assert hasattr(request, 'session'), (
            "The Django authentication middleware requires session middleware "
            "to be installed. Edit your MIDDLEWARE_CLASSES setting to insert "
            "'django.contrib.sessions.middleware.SessionMiddleware' before "
            "'django.contrib.auth.middleware.AuthenticationMiddleware'."
        )
        request.user = SimpleLazyObject(lambda: get_user(request))


class SessionAuthenticationMiddleware(object):
    """
    Formerly, a middleware for invalidating a user's sessions that don't
    correspond to the user's current session authentication hash. However, it
    caused the "Vary: Cookie" header on all responses.

    Now a backwards compatibility shim that enables session verification in
    auth.get_user() if this middleware is in MIDDLEWARE_CLASSES.
    """
    def process_request(self, request):
        pass