'use strict';

/**
 * @ngdoc overview
 * @name partyBidApp
 * @description
 * # partyBidApp
 *
 * Main module of the application.
 */

angular
  .module('partyBidApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/activity_list.html',
        controller: 'activityListCtrl'
      })
      .when('/create_activity', {
        templateUrl: 'views/create_activity.html',
        controller: 'createActivityCtrl'
      })
       .when('/activity_sign_up/:activity_name',{
        templateUrl:'views/activity_sign_up.html',
        controller:'activitySignUpCtrl'
       })
        .when('/activity_list',{
        templateUrl:'views/activity_list.html',
        controller:'activityListCtrl'
        })
        .when('/biding_list/:activity_name',{
          templateUrl:'views/biding_list.html',
          controller:'bidingListCtrl'
        })
        .when('/activity_biding/:biding_name',{
            templateUrl:'views/activity_biding.html',
            controller:'activityBidingCtrl'
        })
        .when('/price_statistics/:biding_name',{
            templateUrl:'views/price_statistics.html',
            controller:'priceStatisticCtrl'
        })
        .when('/price_result/:biding_name',{
            templateUrl:'views/price_result.html',
            controller:'priceResultCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });

  });
