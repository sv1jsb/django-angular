# -*- coding: utf-8 -*-
import json
from bson import ObjectId
from django.test.client import Client
from tests.drf.cases import MongoengineCase
from tests.drf.mocks import mock_user1, mock_user2
from authentication.models import User


class AuthenticationCase(MongoengineCase):

    @classmethod
    def setUpClassData(cls):
        u = User(email=mock_user1["email"], username=mock_user1["username"])
        u.set_password(mock_user1["password"])
        u.save()

    def setUp(self):
        self.client = Client()

    def test_get_users_auth(self):
        response = self.client.post('/api/v1/auth/login/',
                                    data=json.dumps({"email": mock_user1["email"], "password": mock_user1["password"]}),
                                    content_type="application/json")
        self.assertEquals(response.status_code, 200)
        response = self.client.get('/api/v1/users/')
        u = json.loads(response.content)
        self.assertEquals(u[0]['username'], mock_user1["username"])
        self.assertContains(response, 'email')

    def test_get_users_non_auth(self):
        response = self.client.get('/api/v1/users/')
        u = json.loads(response.content)
        self.assertEquals(u[0]['username'], mock_user1["username"])
        self.assertNotContains(response, 'email')

    def test_create_get_user_non_auth(self):
        response = self.client.post('/api/v1/users/', data=json.dumps(mock_user2), content_type="application/json")
        self.assertEquals(response.status_code, 201)
        user_id = json.loads(response.content)["id"]
        response = self.client.get('/api/v1/users/%s/' % user_id)
        self.assertEquals(response.status_code, 200)
        self.assertNotContains(response, 'email')

    def test_update_delete_user(self):
        response = self.client.post('/api/v1/auth/login/',
                                    data=json.dumps({"email": mock_user2["email"], "password": mock_user2["password"]}),
                                    content_type="application/json")
        self.assertEquals(response.status_code, 200)
        user = json.loads(response.content)
        self.assertEquals(user["username"], mock_user2["username"])
        user["password"] = "new"
        user["confirm_password"] = "new"
        user["tagline"] = "new tagline"
        response = self.client.put('/api/v1/users/%s/' % user["id"], data=json.dumps(user), content_type="application/json")
        self.assertEquals(response.status_code, 200)
        self.assertContains(response, 'new tagline')
        response = self.client.delete('/api/v1/users/%s/' % user["id"])
        self.assertEquals(response.status_code, 204)

    def test_errors(self):
        response = self.client.get('/api/v1/users/%s/' % ObjectId())
        self.assertEquals(response.status_code, 404)
        response = self.client.post('/api/v1/users/', data=json.dumps({"wrong_data": "sure"}), content_type="application/json")
        self.assertEquals(response.status_code, 400)
        response = self.client.post('/api/v1/auth/login/',
                                    data=json.dumps({"email": mock_user2["email"], "password": mock_user2["password"]}),
                                    content_type="application/json")
        self.assertEquals(response.status_code, 200)
        user = User.objects.get(id=json.loads(response.content)["id"])
        response = self.client.put('/api/v1/users/%s/' % user.id, data=json.dumps({"wrong_data": "sure"}), content_type="application/json")
        self.assertEquals(response.status_code, 400)
        user.is_active = False
        user.save()
        response = self.client.post('/api/v1/auth/login/',
                                    data=json.dumps({"email": mock_user2["email"], "password": mock_user2["password"]}),
                                    content_type="application/json")
        self.assertEquals(response.status_code, 401)
        user.is_active = True
        user.save()
        response = self.client.post('/api/v1/auth/logout/')
        self.assertEquals(response.status_code, 204)
        response = self.client.put('/api/v1/users/%s/' % user.id, data=user.to_json(), content_type="application/json")
        self.assertEquals(response.status_code, 403)
        response = self.client.post('/api/v1/auth/login/',
                                    data=json.dumps({"email": "wrong@email.com", "password": "wrong"}),
                                    content_type="application/json")
        self.assertEquals(response.status_code, 401)