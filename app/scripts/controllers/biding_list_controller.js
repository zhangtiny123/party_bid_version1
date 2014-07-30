/**
 * Created by tiny on 14-7-30.
 */
'use strict'
angular.module('partyBidApp')
    .controller('bidingListCtrl',function($scope,$location,$routeParams){

        var passed_activity_name = $routeParams.activity_name;
//        console.log(passed_activity_name);
//        console.log('hehe');
//        $scope.bidings = JSON.parse(localStorage['']);

        $scope.back_to_activity_list = function() {
            $location.path('/activity_list');
        }

        $scope.to_biding_page = function() {
            $location.path('/activity_biding');
        }

        $scope.start_bid = function() {


        }
    });