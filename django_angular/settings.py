# coding=utf-8
"""
Django settings for django_angular project.
"""
import os
import mongoengine

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', '$6(x*g_2g9l_*g8peb-@anl5^*8q!1w)k&e&2!i)t6$s8kia94')

DEBUG = os.environ.get('DJANGO_DEBUG', 'True') == 'True'

INTERNAL_IPS = ('127.0.0.1',)

INSTALLED_APPS = (
    'django.contrib.sessions',
    'django.contrib.staticfiles',
    'mongo_auth',
    'rest_framework',
    'rest_framework_mongoengine',
    'authentication',
    'gulpstatic',
    'posts',
    'sse_posts',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'mongo_auth.middleware.AuthenticationMiddleware',
    'mongo_auth.middleware.SessionAuthenticationMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

ROOT_URLCONF = 'django_angular.urls'

WSGI_APPLICATION = 'django_angular.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': ''
    },
}

mongoengine.connect('django_angular', connect=False)

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                "mongo_auth.context_processors.auth",
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.template.context_processors.i18n",
                "django.template.context_processors.media",
                "django.template.context_processors.static",
                "django.template.context_processors.tz",
            ],
        },
    },
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    ),
    'UNAUTHENTICATED_USER': 'mongo_auth.models.AnonymousUser'
}

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Allow all host headers
ALLOWED_HOSTS = ['*']

AUTHENTICATION_BACKENDS = ('mongo_auth.backend.CustomBackend', )
AUTH_USER_MODEL = 'authentication.User'
AUTH_USER_MODEL_SERIALIZER = 'authentication.UserSerializer'
SESSION_ENGINE = 'mongo_sessions.engine'