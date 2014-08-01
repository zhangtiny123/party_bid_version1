/**
 * Created by tiny on 14-7-30.
 */
'use strict'
angular.module('partyBidApp')
    .controller('activityBidingCtrl',function($scope,$location,$routeParams){

        var bid_name = $routeParams.biding_name;
        var current_activity_name = JSON.parse(localStorage['current_activity']).nameof_activity;

        $scope.number_of_bid = JSON.parse(localStorage[bid_name]).length;
        $scope.persons = JSON.parse(localStorage[bid_name]);

        $scope.back_to_bid_list = function() {
            $location.path('/biding_list/'+current_activity_name);
        }

        $scope.stop_biding = function() {
            var bidding_start_tag = JSON.parse(localStorage['biding_start_tag']);
            bidding_start_tag = 0;
            localStorage['biding_start_tag'] = JSON.stringify(bidding_start_tag);

            Biding.end_bid(bid_name);
        }

        $scope.is_end_enable = function() {

        }
    });