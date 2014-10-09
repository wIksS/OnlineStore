app.factory('identity', function($cookieStore, UsersResource){
    var cookieStorageUserKey = 'currentOnlineShopUser';

    var currentUser;
    return {
        getCurrentUser: function () {
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
            return !!this.getCurrentUser();
        },
        isAuthorizedForRole: function (role) {
            return !!this.getCurrentUser() && this.getCurrentUser().role===role;
        },
        isAdmin: function () {
            return this.isAuthorizedForRole('admin');
        }
    }
});