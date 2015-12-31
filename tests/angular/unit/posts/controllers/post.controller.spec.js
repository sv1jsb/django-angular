/**
 * Created by andreas on 31/12/2015.
 */
describe('posts', function () {

    beforeEach(module('django-angular'));

    describe('PostController', function () {
        var ctrl, scope, $rootScope, MyAuthentication, MyPosts, post;
        beforeEach(inject(function(_$rootScope_, $controller){
            MyAuthentication = mockAuthentication(true);
            MyAuthentication.setAuthenticatedAccount(mockUser);
            $rootScope = _$rootScope_;
            $rootScope.auth = MyAuthentication;
            scope = $rootScope.$new();
            post = new mockPost();
            scope.post = post;
            MyPosts = mockPosts();
            spyOn($rootScope, '$broadcast').and.callThrough();
            ctrl = $controller('PostController', {$scope: scope, Authentication: MyAuthentication, Posts: MyPosts});
        }));
        it('should delete the post', function(){
            ctrl.deletePost(post.id);
            expect($rootScope.$broadcast).toHaveBeenCalled();
        });
    })
});