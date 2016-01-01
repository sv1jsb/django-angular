/**
 * Created by andreas on 1/1/2016.
 */

describe('posts', function(){

    beforeEach(module('django-angular'));

    describe('PostsDirective', function () {
        var $compile, $rootScope, scope, element;
        beforeEach(module('/static/templates/posts/posts.html'));
        beforeEach(module('/static/templates/posts/post.html'));
        beforeEach(inject(function(_$rootScope_, _$compile_){
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            scope = $rootScope.$new();
            scope.posts = [];
            element = angular.element('<posts posts="posts"></posts>');
            $compile(element)(scope);
            scope.$digest();

        }));
        it('should render no posts', function(){
            expect(element.html()).toContain("The are no posts here.");
        });
        it('should render 2 posts', function(){
            scope.$apply(function(){
                scope.posts = [new mockPost(), new mockPost()]
            });
            expect(element.find("div.post__content").length).toEqual(2);

        });
    });
});
