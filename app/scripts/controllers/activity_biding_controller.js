/**
 * Created by tiny on 14-7-30.
 */
'use strict'
angular.module('partyBidApp')
    .controller('activityBidingCtrl',function($scope,$location,$routeParams){

        var bid_name = $routeParams.biding_name;
        var current_activity_name = JSON.parse(localStorage['current_activity']).nameof_activity;
        $scope.number_of_bid = JSON.parse(localStorage[bid_name]).length;

        $scope.back_to_bid_list = function() {
            $location.path('/biding_list/'+current_activity_name);
        }

        $scope.stop_biding = function() {

        }

        $scope.is_end_enable = function() {

        }
    });