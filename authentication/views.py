# coding=utf-8
import json
from datetime import datetime
from django.shortcuts import Http404
from rest_framework import permissions, status, views, parsers, renderers
from rest_framework.response import Response
from mongo_auth import authenticate, login, logout, update_session_auth_hash
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
            return Response(user.to_json(), status=status.HTTP_201_CREATED)
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


class LoginView(views.APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)
        email = data.get('email', None)
        password = data.get('password', None)
        user = authenticate(email=email, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)
                user.last_login = datetime.utcnow()
                user.save()
                serialized = UserSerializer(user)
                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)