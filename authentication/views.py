# coding=utf-8
from django.shortcuts import Http404
from rest_framework import permissions, status, parsers, renderers
from rest_framework.response import Response
from mongo_auth import update_session_auth_hash
from authentication.models import User
from authentication.permissions import IsAccountOwner
from authentication.serializers import UserSerializer, UserSerializerNonAuth
from rest_framework_mongoengine.viewsets import ModelViewSet


class UsersView(ModelViewSet):
    parser_classes = (parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    queryset = User.objects.all()

    def get_serializer_class(self):
        """
        Checks if request is authenticated and if not
        send user's info without email field
        :return: UserSerializer or UserSerializerNonAuth
        """
        if self.request.user.is_authenticated():
            return UserSerializer
        else:
            return UserSerializerNonAuth

    def get_object(self):
        try:
            user = User.objects(id=self.kwargs['id'])[0]
        except IndexError:
            raise Http404
        self.check_object_permissions(self.request, user)
        return user

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return permissions.IsAuthenticated(), IsAccountOwner()

    def list(self, request, *args, **kwargs):
        ds = self.get_serializer_class()(User.objects, many=True)
        return Response(ds.data)

    def create(self, request, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"id": str(user.id)}, status=status.HTTP_201_CREATED, content_type="application/json")
        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            update_session_auth_hash(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({
                    'status': 'Failed',
                    'message': 'Update failed with submitted data'
                }, status=status.HTTP_400_BAD_REQUEST)
