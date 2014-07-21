'use strict';

/**
 * @ngdoc function
 * @name partyBidApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the partyBidApp
 */
angular.module('partyBidApp')
  .controller('MainCtrl', function ($scope,$location) {

        $scope.create_activity=function(){
            $location.path('/create_activity')
        }

        $scope.to_activity_list=function() {
            $location.path('/activity_list')
        }


  });
