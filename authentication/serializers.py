# coding=utf-8
from datetime import datetime
from rest_framework_mongoengine import serializers
from authentication.models import User


class UserSerializer(serializers.DocumentSerializer):
    password = serializers.drf_fields.CharField(write_only=True, required=False)
    confirm_password = serializers.drf_fields.CharField(write_only=True, required=False)
    tagline = serializers.drf_fields.CharField(max_length=140, required=False, allow_blank=True, allow_null=True)
    first_name = serializers.drf_fields.CharField(max_length=40, required=False, allow_blank=True, allow_null=True)
    last_name = serializers.drf_fields.CharField(max_length=40, required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = User
        depth = 1
        fields = ('id', 'email', 'username', 'created_at', 'updated_at', 'first_name', 'last_name',
                  'tagline', 'password', 'confirm_password')
        read_only_fields = ('created_at', 'updated_at',)

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data.get('password'))
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.tagline = validated_data.get('tagline', instance.tagline)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.updated_at = datetime.utcnow()
        instance.save()

        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)

        if password and confirm_password and password == confirm_password:
            instance.set_password(password)
            instance.save()

        return instance


class UserSerializerNonAuth(serializers.DocumentSerializer):
    """
    Used for returning users' data, except email, to non authenticated users
    """
    class Meta:
        model = User
        depth = 1
        fields = ('id', 'username', 'first_name', 'last_name', 'tagline')

