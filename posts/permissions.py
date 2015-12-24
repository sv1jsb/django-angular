# _*_ coding: utf-8 _*_
from rest_framework import permissions


class IsAuthorOfPost(permissions.BasePermission):
    def has_object_permission(self, request, view, post):
        if request.user:
            return post.author == request.user
        return False