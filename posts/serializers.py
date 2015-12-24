# _*_ coding: utf-8 _*_
from rest_framework_mongoengine import serializers
from authentication.serializers import UserSerializer, UserSerializerNonAuth
from posts.models import Post


class PostSerializer(serializers.DocumentSerializer):
    author = UserSerializer(read_only=True, required=False)

    class Meta:
        model = Post
        depth = 1
        fields = ('id', 'author', 'content', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')


class PostSerializerNonAuth(serializers.DocumentSerializer):
    """
    Uses users' serializer for non authenticated requests.
    Users without email are returned.
    """
    author = UserSerializerNonAuth(read_only=True, required=False)

    class Meta:
        model = Post
        depth = 1
        fields = ('id', 'author', 'content', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')