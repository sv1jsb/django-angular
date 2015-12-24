# coding=utf-8
from django.utils.crypto import salted_hmac
from django.contrib.auth.hashers import (
    check_password, is_password_usable, make_password,
)
from mongoengine import Document, StringField, EmailField, DateTimeField, BooleanField


class AbstractUser(Document):
    email = EmailField(unique=True, required=True)
    username = StringField(max_length=40, unique=True, required=True)
    password = StringField(max_length=128, required=True)

    first_name = StringField(max_length=40, required=False)
    last_name = StringField(max_length=40, required=False)

    is_admin = BooleanField(default=False)
    is_active = BooleanField(default=True)

    last_login = DateTimeField()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    meta = {
        'abstract': True,
    }

    def __unicode__(self):
        return self.username

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name

    def get_username(self):
        return getattr(self, self.USERNAME_FIELD)

    def natural_key(self):
        return (self.get_username(),)

    def is_anonymous(self):
        """
        Always returns False. This is a way of comparing User objects to
        anonymous users.
        """
        return False

    def is_authenticated(self):
        """
        Always return True. This is a way to tell if the user has been
        authenticated in templates.
        """
        return True

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        """
        Returns a boolean of whether the raw_password was correct. Handles
        hashing formats behind the scenes.
        """
        def setter(raw_password):
            self.set_password(raw_password)
            self.save(update_fields=["password"])
        return check_password(raw_password, self.password, setter)

    def set_unusable_password(self):
        # Sets a value that will never be a valid hash
        self.password = make_password(None)

    def has_usable_password(self):
        return is_password_usable(self.password)

    def get_session_auth_hash(self):
        """
        Returns an HMAC of the password field.
        """
        key_salt = "django.contrib.auth.models.AbstractBaseUser.get_session_auth_hash"
        return salted_hmac(key_salt, self.password).hexdigest()


class AnonymousUser(object):
    id = None
    pk = None
    username = ''
    is_staff = False
    is_active = False
    is_superuser = False

    def __init__(self):
        pass

    def __str__(self):
        return 'AnonymousUser'

    def __eq__(self, other):
        return isinstance(other, self.__class__)

    def __ne__(self, other):
        return not self.__eq__(other)

    def __hash__(self):
        return 1  # instances always return the same hash value

    def save(self):
        raise NotImplementedError("Django doesn't provide a DB representation for AnonymousUser.")

    def delete(self):
        raise NotImplementedError("Django doesn't provide a DB representation for AnonymousUser.")

    def set_password(self, raw_password):
        raise NotImplementedError("Django doesn't provide a DB representation for AnonymousUser.")

    def check_password(self, raw_password):
        raise NotImplementedError("Django doesn't provide a DB representation for AnonymousUser.")

    def is_anonymous(self):
        return True

    def is_authenticated(self):
        return False

    def get_username(self):
        return self.username