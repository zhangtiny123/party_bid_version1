/**
 * Created by tiny on 14-8-6.
 */
'use strict'

angular.module('partyBidApp')
    .controller('priceResultCtrl',function($scope,$location,$routeParams){
        var get_bid_name = $routeParams.biding_name;
        $scope.bid_name =  get_bid_name;
        $scope.number_of_bid = get_bid_name.length;

        $scope.count_data_button =  function() {

        }

        $scope.is_button_enable = function() {

        }

        $scope.back_to_bid_list = function() {

        }
    });