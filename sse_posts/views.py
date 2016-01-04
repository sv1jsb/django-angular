# _*_ coding: utf-8 _*_
from django.http import HttpResponse
from django.conf import settings


def subscribe(request):
    if settings.ENABLE_SSE:
        response = HttpResponse()
        response['X-Offload-to-SSE'] = request.user
    else:
        response = HttpResponse('SSE not enabled')
    return response