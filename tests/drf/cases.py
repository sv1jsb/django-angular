# -*- coding: utf-8 -*-
from django.test import SimpleTestCase
import mongoengine


class MongoengineCase(SimpleTestCase):
    @classmethod
    def setUpClass(cls):
        super(MongoengineCase, cls).setUpClass()
        mongoengine.connection.disconnect()
        mongoengine.connect('test_djangular')
        cls.setUpClassData()

    @classmethod
    def setUpClassData(cls):
        pass

    @classmethod
    def tearDownClass(cls):
        connection = mongoengine.connection.get_connection()
        connection.drop_database('test_djangular')
        mongoengine.connection.disconnect()
