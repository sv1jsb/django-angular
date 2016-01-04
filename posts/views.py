# coding=utf-8
from datetime import datetime
from bson.objectid import ObjectId
import redis
from django.apps import apps
from django.shortcuts import Http404
from rest_framework import permissions, status, parsers, renderers
from rest_framework_mongoengine.viewsets import ModelViewSet
from rest_framework.response import Response
from posts.models import Post
from posts.permissions import IsAuthorOfPost
from posts.serializers import PostSerializer, PostSerializerNonAuth


class PostsView(ModelViewSet):
    parser_classes = (parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    queryset = Post.objects

    def __init__(self, **kwargs):
        super(PostsView, self).__init__(**kwargs)
        self.redis_con = apps.get_app_config('posts').redis_con

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        if self.request.method == "POST":
            return (permissions.IsAuthenticated(),)
        return (permissions.IsAuthenticated(), IsAuthorOfPost(),)

    def get_serializer_class(self):
        """
        Checks if request is authenticated and if not
        send user's info without email field
        :return: Postserializer or PostSerializerNonAuth
        """
        if self.request.user.is_authenticated():
            return PostSerializer
        else:
            return PostSerializerNonAuth

    def get_object(self):
        try:
            post = Post.objects(id=self.kwargs['id'])[0]
        except IndexError:
            raise Http404
        self.check_object_permissions(self.request, post)
        return post

    def list(self, request, *args, **kwargs):
        if request.GET.get('author_id'):
            ds = self.get_serializer_class()(Post.objects(author=ObjectId(request.GET.get('author_id'))).order_by('-created_at'), many=True)
        else:
            ds = self.get_serializer_class()(self.get_queryset().order_by('-created_at'), many=True)
        return Response(ds.data)

    def create(self, request, *args, **kwargs):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            post = Post(**serializer.validated_data)
            post.author = request.user
            post.save()
            self.redis_con.publish('new_post', post.id)
            serializer = PostSerializer(post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'Post could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        post = self.get_object()
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            post = serializer.save()
            post.updated_at = datetime.utcnow()
            post.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({
                    'status': 'Failed',
                    'message': 'Update failed with submitted data'
                }, status=status.HTTP_400_BAD_REQUEST)