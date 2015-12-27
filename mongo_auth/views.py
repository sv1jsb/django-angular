# -*- coding: utf-8 -*-
import json
from datetime import datetime
from rest_framework import permissions, status, views
from rest_framework.response import Response
from mongo_auth import authenticate, login, logout, get_user_model, get_user_serialiser


class LoginView(views.APIView):
    def post(self, request, format=None):
        serializer_class = get_user_serialiser()
        model_class = get_user_model()
        data = json.loads(request.body)
        username = data.get(model_class.USERNAME_FIELD, None)
        password = data.get('password', None)
        user = authenticate(**{model_class.USERNAME_FIELD: username, 'password': password})

        if user is not None:
            if user.is_active:
                login(request, user)
                user.last_login = datetime.utcnow()
                user.save()
                serialized = serializer_class(user)
                return Response(serialized.data, status=status.HTTP_200_OK)
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