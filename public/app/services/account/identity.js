app.factory('identity', function($cookieStore, UsersResource){
    var cookieStorageUserKey = 'currentOnlineShopUser';

    var currentUser;
    return {
        currentUser: function () {
            var savedUser = $cookieStore.get(cookieStorageUserKey);
            if(savedUser){
                return savedUser;
            }

            return currentUser;
        },
        setCurrentUser: function (user) {
            if  (user){
                $cookieStore.put(cookieStorageUserKey, user);
            }
            else{
                $cookieStore.remove(cookieStorageUserKey);
            }

            currentUser = user;
        },
        isAuthenticated: function(){
            return !!this.currentUser();
        },
        isAuthorizedForRole: function (role) {
            return !!this.currentUser() && this.currentUser().roles.indexOf(role) > -1;
        },
        isAdmin: function () {
            return this.isAuthorizedForRole('admin');
        }
    }
});