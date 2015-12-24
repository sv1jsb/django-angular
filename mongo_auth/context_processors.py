# coding=utf-8
def auth(request):
    """
    Returns context variables required by apps that use Django's authentication
    system.

    If there is no 'user' attribute in the request, uses AnonymousUser (from
    django.contrib.auth).
    """
    if hasattr(request, 'user'):
        user = request.user
    else:
        from authentication.models import AnonymousUser
        user = AnonymousUser()

    return {
        'user': user,
    }
