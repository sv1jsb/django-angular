/**
 * Created by andreas on 30/12/2015.
 */
describe('posts', function () {

    beforeEach(module('django-angular'));

    describe('EditPostController', function () {
        var ctrl, scope, $rootScope, MyPosts, MySnackBar, MyAuthentication, post;
        beforeEach(inject(function(_$rootScope_, $controller){
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            scope.closeThisDialog = function(){};
            MyAuthentication = mockAuthentication(true);
            MyAuthentication.setAuthenticatedAccount(mockUser);
            MyPosts = mockPosts();
            spyOn($rootScope, '$broadcast').and.callThrough();
            MySnackBar = mockSnackbar;
            post = new mockPost();
            ctrl = $controller('EditPostController', {$scope: scope, Posts: MyPosts, Snackbar: MySnackBar,
                        Authentication: MyAuthentication, postId: post.id});
        }));
        it('should have a post to edit', function(){
            expect(ctrl.post).toEqual(post);
        });
        it('should update the post', function(){
            ctrl.post.content = 'new content';
            ctrl.submit();
            expect($rootScope.$broadcast).toHaveBeenCalled();
        });
        it('should display error', function(){
            ctrl.post.content = null;
            ctrl.submit();
            expect(scope.error).toBeDefined();
        })
    })
});