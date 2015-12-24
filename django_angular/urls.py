from django.conf.urls import url, include
from django_angular.views import IndexView
from rest_framework_mongoengine import routers
from authentication.views import UsersView, LoginView, LogoutView
from posts.views import PostsView

router = routers.SimpleRouter()
router.register(r'users', UsersView, base_name='post')
router.register(r'posts', PostsView, base_name='post')

urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url('^.*$', IndexView.as_view(), name='index'),
]
