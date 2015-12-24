# _*_ coding: utf-8 _*_
from authentication.models import User


class CustomBackend(object):

    def authenticate(self, username=None, password=None, **kwargs):
        UserModel = User
        if username is None:
            username = kwargs.get(UserModel.USERNAME_FIELD)
        try:
            q = {UserModel.USERNAME_FIELD: username}
            user = UserModel.objects(**q)[0]
            if user.check_password(password):
                return user
        except IndexError:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a non-existing user (#20760).
            UserModel().set_password(password)

    def get_user(self, user_id):
        UserModel = User
        try:
            return UserModel.objects(id=user_id)[0]
        except IndexError:
            return None