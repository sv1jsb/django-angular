/**
 * Created by andreas on 31/12/2015.
 */

describe('posts', function(){

    beforeEach(module('django-angular'));
    beforeEach(function(){
        module(function($provide){
            $provide.value('Authentication', mockAuthentication(true));
        })
    });
    describe('PostsService', function () {
        var Posts, $httpBackend;

        beforeEach(inject(function(_Posts_, _$httpBackend_){
            Posts = _Posts_;
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/api/v1/posts/')
                .respond(200, [new mockPost()]);
        }));
        it('\'all\' should return list of posts', function(){
            Posts.all().then(function(response){
                expect(response.data.length).toBe(1);
            });
            $httpBackend.flush();
        });
    });
    describe('PostsService', function () {
        var Posts, $httpBackend, post;

        beforeEach(inject(function(_Posts_, _$httpBackend_){
            Posts = _Posts_;
            $httpBackend = _$httpBackend_;
            post = new mockPost();
            post.content = "new post";
            $httpBackend.expectPOST('/api/v1/posts/')
                .respond(200, post);
        }));
        it('\'create\' should create a post', function(){
            Posts.create("new post").then(function(response){
                expect(response.data.content).toEqual("new post");
            });
            $httpBackend.flush();
        });
    });
    describe('PostsService', function () {
        var Posts, $httpBackend, post;

        beforeEach(inject(function (_Posts_, _$httpBackend_) {
            Posts = _Posts_;
            $httpBackend = _$httpBackend_;
            post = new mockPost();
            $httpBackend.expectGET('/api/v1/posts/'+post.id+'/')
                .respond(200, post);
        }));
        it('\'get\' should return a post', function () {
            Posts.get(post.id).then(function (response) {
                expect(response.data).toEqual(post);
            });
            $httpBackend.flush();
        })
    });
    describe('PostsService', function () {
        var Posts, $httpBackend, post;

        beforeEach(inject(function (_Posts_, _$httpBackend_) {
            Posts = _Posts_;
            $httpBackend = _$httpBackend_;
            post = new mockPost();
            post.content = "update post";
            $httpBackend.expectPUT('/api/v1/posts/'+post.id+'/')
                .respond(200, post);
        }));
        it('\'update\' should update a post', function () {
            Posts.update(post.id).then(function (response) {
                expect(response.data.content).toEqual('update post');
            });
            $httpBackend.flush();
        })
    });
    describe('PostsService', function () {
        var Posts, $httpBackend, post;

        beforeEach(inject(function (_Posts_, _$httpBackend_) {
            Posts = _Posts_;
            $httpBackend = _$httpBackend_;
            post = new mockPost();
            post.content = "update post";
            $httpBackend.expectDELETE('/api/v1/posts/'+post.id+'/')
                .respond(200, '');
        }));
        it('\'delete\' should delete a post', function () {
            Posts.delete(post.id).then(function (response) {
                expect(response.status).toEqual(200);
            });
            $httpBackend.flush();
        })
    });
});