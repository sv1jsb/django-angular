/**
 * Created by andreas on 30/12/2015.
 */

var cookieAuthName = 'authenticatedAccount';

var mockUser = {
    id: "567b9a2e8871540f417329e4",
    username: "test",
    email: "test@test.com",
    first_name: "Test",
    last_name: "Account",
    tagline: "my tag"
};

var mockPost = {
    id: "56812300887154364a163385",
    author: {
        id: "567b9a2e8871540f417329e4",
        username: "test",
        first_name: "Test",
        last_name: "Account",
        tagline: "my tag"
    },
    content: "new from test",
    created_at: "2015-12-28T11:54:40.008000",
    updated_at: null
};

var mockSnackbar = {
    errorMessage: [],
    error: function(m){
        this.errorMessage.push(m)
    },
    show: function(m){
        console.log(m);
    }
};

var mockLocation = {
    _path: null,
    path: function(p){
        if(p) this._path = p;
        return this._path;
    },
    url: function(p){
        this.path = p
    }
};

/**
 * Mocking the Authentication service
 * @param auth the return value of isAuthenticted
 * @param cookies the cookies service to use
 * @returns {{isAuthenticated: obj.isAuthenticated, login: obj.login}}
 */
var mockAuthentication = function (auth) {
    var _user = null;
    var obj = {
        getAuthenticatedAccount: getAuthenticatedAccount,
        isAuthenticated: isAuthenticated,
        login: login,
        logout: logout,
        register: register,
        setAuthenticatedAccount: setAuthenticatedAccount,
        unauthenticate: unauthenticate,
        username: getUsername
    };
    return obj;
    ////////////////////
    function getUsername(){
        var user = getAuthenticatedAccount();
        if(user) return user.username;
        else return null;
    }
    function register(email, password, username) {
        login(email, password)
    }

    function login(email, password) {
        _user = mockUser;
    }

    function logout() {
        _user = null;
    }

    function getAuthenticatedAccount() {
        return _user;
    }

    function isAuthenticated() {
        return auth;
    }

    function setAuthenticatedAccount(account) {
        _user = account;
    }

    function unauthenticate() {
        _user = null;
    }
};

var mockPosts = function () {
    var _posts = [mockPost];

    var obj = {
        all: all,
        create: create,
        get: get,
        update: update,
        delete: deletePost,
        getUserPosts: getUserPosts
    };

    return obj;

    ////////////////////

    function all() {
        var obj = {
            then: function(success, fail){
                success({data:_posts});
                return obj;
            },
            finally: function(f){
                return obj;
            }
        };
        return obj;
    }

    function create(content) {
        var obj = {
            then: function(success, fail){
                var p = {
                    id: 'someID',
                    author: mockUser,
                    content: content
                };
                _posts.push(p);
                success({data: p});
                return obj;
            }
        };
        return obj;
    }

    function get(id) {
        var obj = {
            then: function(success, fail){
                success({data:_posts[0]});
                return obj;
            }
        };
        return obj;
    }

    function update(id, content) {
        var obj = {
            then: function(success, fail){
                _posts[0].content = content;
                success({data: _posts[0]});
                return obj;
            }
        };
        return obj;
    }

    function deletePost(id) {
        var obj = {
            then: function(success, fail){
                _posts.shift();
                success({});
                return obj;
            }
        };
        return obj;
    }

    function getUserPosts(user_id) {
        var obj = {
            then: function(success, fail){
                success({data:_posts});
                return obj;
            }
        };
        return obj;
    }
};

var mockProfile = function () {

    var obj = {
        destroy: destroy,
        get: get,
        update: update
    };

    return obj;

    /////////////////////

    function destroy(username) {
        var obj = {
            then: function(success, fail){
                success({data: []});
                return obj;
            }
        };
        return obj;

    }

    function get(user_id) {
        var obj = {
            then: function(success, fail){
                success({data: mockUser});
                return obj;
            }
        };
        return obj;
    }

    function update(profile) {
        var obj = {
            then: function(success, fail){
                success({data: mockUser});
                return obj;
            }
        };
        return obj;
    }
};