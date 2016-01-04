# _*_ coding: utf-8 _*_
from django.http import HttpResponse


def subscribe(request):
    response = HttpResponse()
    response['X-Offload-to-SSE'] = request.user
    return response