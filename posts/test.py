# -*- coding: utf-8 -*-
import json
from bson import ObjectId
from django.test.client import Client
from tests.drf.cases import MongoengineCase
from tests.drf.mocks import mock_user1, mock_user2
from authentication.models import User
from posts.models import Post


class PostsCase(MongoengineCase):

    @classmethod
    def setUpClassData(cls):
        cls.user = User(email=mock_user1["email"], username=mock_user1["username"])
        cls.user.set_password(mock_user1["password"])
        cls.user.save()
        cls.post = Post(content="post1", author=cls.user.pk)
        cls.post.save()

    def setUp(self):
        self.client = Client()

    def test_get_posts_auth(self):
        response = self.client.post('/api/v1/auth/login/',
                                    data=json.dumps({"email": mock_user1["email"], "password": mock_user1["password"]}),
                                    content_type="application/json")
        self.assertEquals(response.status_code, 200)
        response = self.client.get('/api/v1/posts/', content_type="application/json")
        posts = json.loads(response.content)
        self.assertGreaterEqual(len(posts), 1)
        self.assertContains(response, 'email')

    def test_get_posts_non_auth(self):
        response = self.client.get('/api/v1/posts/', content_type="application/json")
        posts = json.loads(response.content)
        self.assertGreaterEqual(len(posts), 1)
        self.assertNotContains(response, 'email')

    def test_get_user_posts(self):
        response = self.client.get('/api/v1/posts/', data={"author_id": self.user["id"]}, content_type="application/json")
        posts = json.loads(response.content)
        self.assertGreaterEqual(len(posts), 1)
        self.assertNotContains(response, 'email')

    def test_create_post(self):
        response = self.client.post('/api/v1/auth/login/',
                                    data=json.dumps({"email": mock_user1["email"], "password": mock_user1["password"]}),
                                    content_type="application/json")
        self.assertEquals(response.status_code, 200)
        response = self.client.post('/api/v1/posts/', data=json.dumps({"content": "new post from test"}), content_type="application/json")
        self.assertEquals(response.status_code, 201)
        response = self.client.post('/api/v1/posts/', data=json.dumps({"wrong_data": "sure"}), content_type="application/json")
        self.assertEquals(response.status_code, 400)

    def test_create_post_error(self):
        response = self.client.post('/api/v1/auth/login/',
                                    data=json.dumps({"email": mock_user1["email"], "password": mock_user1["password"]}),
                                    content_type="application/json")
        self.assertEquals(response.status_code, 200)
        response = self.client.post('/api/v1/posts/', data=json.dumps({"content": "new post from test", "author": "5688edf51166aa49ea2eb074"}), content_type="application/json")
        post = json.loads(response.content)
        self.assertEqual(post["author"]["id"], str(self.user["id"]))

    def test_update_post(self):
        response = self.client.post('/api/v1/auth/login/',
                                    data=json.dumps({"email": mock_user1["email"], "password": mock_user1["password"]}),
                                    content_type="application/json")
        self.assertEquals(response.status_code, 200)
        response = self.client.put('/api/v1/posts/%s/' % self.post["id"], data=json.dumps({"content": "updated post"}),
                                   content_type="application/json")
        self.assertEquals(response.status_code, 200)
        response = self.client.put('/api/v1/posts/%s/' % self.post["id"], data=json.dumps({"wrong_data": "sure"}),
                                   content_type="application/json")
        self.assertEquals(response.status_code, 400)
        self.assertEquals(unicode(self.post), u"post1")

    def test_delete_post(self):
        response = self.client.post('/api/v1/auth/login/',
                                    data=json.dumps({"email": mock_user1["email"], "password": mock_user1["password"]}),
                                    content_type="application/json")
        self.assertEquals(response.status_code, 200)
        response = self.client.post('/api/v1/posts/', data=json.dumps({"content": "new post for delete"}), content_type="application/json")
        self.assertEquals(response.status_code, 201)
        post = json.loads(response.content)
        response = self.client.delete('/api/v1/posts/%s/' % post["id"])
        self.assertEquals(response.status_code, 204)

    def test_errors(self):
        u = User(email=mock_user2["email"], username=mock_user2["username"])
        u.set_password(mock_user2["password"])
        u.save()
        response = self.client.post('/api/v1/auth/login/',
                                    data=json.dumps({"email": mock_user2["email"], "password": mock_user2["password"]}),
                                    content_type="application/json")
        self.assertEquals(response.status_code, 200)
        response = self.client.delete('/api/v1/posts/%s/' % self.post["id"])
        self.assertEquals(response.status_code, 403)
        response = self.client.put('/api/v1/posts/%s/' % self.post["id"], data=json.dumps({"content": "new content"}), content_type="application/json")
        self.assertEquals(response.status_code, 403)

    #     response = self.client.post('/api/v1/users/', data=json.dumps(mock_user2), content_type="application/json")
    #     self.assertEquals(response.status_code, 201)
    #     user_id = json.loads(response.content)["id"]
    #     response = self.client.get('/api/v1/users/%s/' % user_id)
    #     self.assertEquals(response.status_code, 200)
    #     self.assertNotContains(response, 'email')
    #
    # def test_update_delete_user(self):
    #     response = self.client.post('/api/v1/auth/login/',
    #                                 data=json.dumps({"email": mock_user2["email"], "password": mock_user2["password"]}),
    #                                 content_type="application/json")
    #     self.assertEquals(response.status_code, 200)
    #     user = json.loads(response.content)
    #     self.assertEquals(user["username"], mock_user2["password"])
    #     user["password"] = "new"
    #     user["confirm_password"] = "new"
    #     user["tagline"] = "new tagline"
    #     response = self.client.put('/api/v1/users/%s/' % user["id"], data=json.dumps(user), content_type="application/json")
    #     self.assertEquals(response.status_code, 200)
    #     self.assertContains(response, 'new tagline')
    #     response = self.client.delete('/api/v1/users/%s/' % user["id"])
    #     self.assertEquals(response.status_code, 204)
    #
    # def test_errors(self):
    #     response = self.client.get('/api/v1/users/%s/' % ObjectId())
    #     self.assertEquals(response.status_code, 404)
    #     response = self.client.post('/api/v1/users/', data=json.dumps({"wrong_data": "sure"}), content_type="application/json")
    #     self.assertEquals(response.status_code, 400)
    #     response = self.client.post('/api/v1/auth/login/',
    #                                 data=json.dumps({"email": mock_user2["email"], "password": mock_user2["password"]}),
    #                                 content_type="application/json")
    #     self.assertEquals(response.status_code, 200)
    #     user = json.loads(response.content)
    #     response = self.client.put('/api/v1/users/%s/' % user["id"], data=json.dumps({"wrong_data": "sure"}), content_type="application/json")
    #     self.assertEquals(response.status_code, 400)
    #     response = self.client.post('/api/v1/auth/logout/')
    #     self.assertEquals(response.status_code, 204)
    #     response = self.client.put('/api/v1/users/%s/' % user["id"], data=json.dumps(user), content_type="application/json")
    #     self.assertEquals(response.status_code, 403)