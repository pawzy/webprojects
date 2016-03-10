'use strict';

// declare modules
angular.module('Authentication', []);

angular.module('BasicHttpAuthExample', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'Authentication',
    'ngCookies'
]).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'modules/authentication/views/login.html',
            controller: 'LoginController'
        }).otherwise({redirectTo: '/view1'});
    }])

    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {
            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }
            });
        }]);