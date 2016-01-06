# django-rest-angular-mongo & SSE

## DRAMS for sort

This is a boilerplate and starter project for using the Django Rest Framework with Angular and MongoDB.
It uses all the latest (by the time of this writing) versions of the various requirements.
It's a simple register/login/create-post project to demonstrate the use of Angular with a REST api and
the use of MongoDB from DRF. It also has an option to enable Server Send Events and update the posts in real time.

It contains a session engine for storing sessions in Mongo and a custom authentication application with an adaptable User model.

Originally copied from [https://github.com/brwr/thinkster-django-angular-boilerplate](https://github.com/brwr/thinkster-django-angular-boilerplate) and
[Building Web Applications with Django and AngularJS](https://thinkster.io/django-angularjs-tutorial), but extended with extra Angular directives and services
to support full CRUD operations on Posts, updated to latest version of Angular, and fixed all bugs.
 
Gulp task for javascript files concatenation and minification.

### mongo_sessions
mongo_sessions is providing the mongodb engine for storing sessions. Copied from mongoengine 0.9 and adapted.
Set SESSION_ENGINE to use it.

    SESSION_ENGINE = 'mongo_sessions.engine'

### mongo_auth
mongo_auth is providing an abstract User class and MongoDB persistence. The commands createsuperuser and changepassword are implemented.
You need to subclass the AbstractUser class, and add any customizations you prefer.
Set AUTHENTICATION_BACKENDS to use it.

    AUTHENTICATION_BACKENDS = ('mongo_auth.backend.CustomBackend', )

Also set AUTH_USER_MODEL and AUTH_USER_MODEL_SERIALIZER to your app's User model and User serializer
e.g.

    AUTH_USER_MODEL = 'authentication.User'
    AUTH_USER_MODEL_SERIALIZER = 'authentication.UserSerializer'

mongo_auth is completely independent from the models of django.contrib.auth. 

Set DRF's setting UNAUTHENTICATED_USER to:

    'UNAUTHENTICATED_USER': 'mongo_auth.models.AnonymousUser'

to eliminate any depreciation warnings deriving from DRF trying to load django.contrib.auth.models.AnonymousUser

Two views are provided for logging in and out users through the REST. Subclass and customize them as needed.

### gulpstatic 
The gulpstatic app holds a management command for building static files with gulp first
then calls django's collectstatic ignoring the static/javascripts directory.


## Installation

*NOTE: Requires [virtualenv](http://virtualenv.readthedocs.org/en/latest/),
[virtualenvwrapper](http://virtualenvwrapper.readthedocs.org/en/latest/) and
[Node.js](http://nodejs.org/).*

* Fork this repository.
* `$ git clone https://github.com/sv1jsb/django-angular.git`
* `$ mkvirtualenv djangular`
* `$ cd django-angular`
* `$ pip install -r requirements.txt`
* `$ npm install -g bower`  (as root)
* `$ npm install -g gulp-cli`   (as root)
* `$ npm install`
* `$ bower install`
* `$ python manage.py runserver`

## Deployment

In order to test deployment workflow, a uwsgi.ini is provided.
You can deploy with the help of uwsgi and serve static files with offloaded threads

* `$ workon djangular`
* `$ cd <project_root>`
* `$ pip install uwsgi`
* `$ ./manage.py buildstatic`
* `$ uwsgi uwsgi.ini`

## Server Send Events

There is also support for Server Send Events and real time update of posts with Angular.
The SSE server is using an offload plugin from the uwsgi project [uwsgi-sse-offload](https://github.com/unbit/uwsgi-sse-offload).
You will also need to have redis installed and running. 
To enable edit uwsgi.ini and change DJANGO_ENABLE_SSE to True, and uncomment the lines:

    plugin = sse_offload
    route = ^/subscribe sse:posts_channel
    
Then you need to run the following command in order to download and compile the required uwsgi plugin:

    uwsgi --build-plugin https://github.com/unbit/uwsgi-sse-offload
    

Run the server with *uwsgi uwsgi.ini* and load the app in two separate browsers, login as two separate users,
and watch the posts change in one when you create/update/delete posts in the other.
Posts are updated even at the *profile* page of a user, thanks to Angular.

This is, on purpose, a simple setup without the use of nginx. It can be easily modified for deployment behind an nginx server.

## Tests

Included are tests for Angular and DRF.
You can run them with:

    npm test
    
A *coverage* directory will be created with code coverage information in *angular* and *drf* subdirs.
Custom mock objects are used but there a lot of libraries out there which can do a better job.

Have fun with this project and experiment. Enjoy!

Andreas

