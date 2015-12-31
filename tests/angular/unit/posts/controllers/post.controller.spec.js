/**
 * Created by andreas on 31/12/2015.
 */
describe('posts', function () {

    beforeEach(module('django-angular'));

    describe('PostController', function () {
        var ctrl, scope, $rootScope, MyAuthentication, MyPosts;
        beforeEach(inject(function(_$rootScope_, $controller){
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            scope.post = mockPost;
            MyAuthentication = mockAuthentication(true);
            MyAuthentication.setAuthenticatedAccount(mockUser);
            MyPosts = mockPosts();
            spyOn($rootScope, '$broadcast').and.callThrough();
            ctrl = $controller('PostController', {$scope: scope, Authentication: MyAuthentication, Posts: MyPosts});
        }));
        it('should delete the post', function(){
            ctrl.deletePost(mockPost.id);
            expect($rootScope.$broadcast).toHaveBeenCalled();
        });
        it('', function(){

        });
    })
});