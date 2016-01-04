# coding=utf-8
from django.conf.urls import url, include
from django_angular.views import IndexView
from rest_framework_mongoengine import routers
from mongo_auth import urls as mongo_auth_urls
from authentication.views import UsersView
from posts.views import PostsView
from sse_posts.views import subscribe

router = routers.SimpleRouter()
router.register(r'users', UsersView, base_name='post')
router.register(r'posts', PostsView, base_name='post')

urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/auth/', include(mongo_auth_urls)),
    url(r'^subscribe$', subscribe, name="subscribe"),
    url('^.*$', IndexView.as_view(), name='index'),
]
