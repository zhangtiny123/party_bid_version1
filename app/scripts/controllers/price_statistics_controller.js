/**
 * Created by tiny on 14-8-6.
 */
'use strict'

angular.module('partyBidApp')
    .controller('priceStatisticCtrl',function($scope,$location,$routeParams){

        var biding_name = $routeParams.biding_name;


        $scope.items = analysis_of_biding.make_price_statistic(biding_name);

        var bid_result = analysis_of_biding.analyze_bid_data(biding_name);


        $scope.success_bid_name = bid_result.name;
        $scope.success_bid_price = bid_result.price;
        $scope.success_bid_person_phone = bid_result.phone;
    });