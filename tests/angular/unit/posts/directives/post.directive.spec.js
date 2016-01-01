/**
 * Created by andreas on 1/1/2016.
 */

describe('posts', function(){

    beforeEach(module('django-angular'));

    describe('PostDirective', function () {
        var $compile, $rootScope, scope, element;
        beforeEach(module('/static/templates/posts/post.html'));
        beforeEach(inject(function(_$rootScope_, _$compile_){
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            scope = $rootScope.$new();
            scope.post = new mockPost();
            element = $compile("<post post='post'></post>")(scope);
            scope.$digest();

        }));
        it('should render post content', function(){
            expect(element.html()).toContain("new from test");
        });
        it('should render link to author profile', function(){
            expect(element.html()).toContain('/profile/+'+scope.post.author.id);
        });
    });
});