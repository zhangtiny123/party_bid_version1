/**
 * Created by tiny on 14-8-6.
 */
'use strict'

angular.module('partyBidApp')
    .controller('priceStatisticCtrl',function($scope,$location,$routeParams){
        var biding_name = $routeParams.biding_name;

        console.log('biding_name:'+biding_name);
        $scope.bid_name =  biding_name.slice(-3);
        $scope.number_of_bid = Biding.get_bid_person_list(biding_name).length;
        $scope.foot_message = true;

        Biding.set_bid_statistics_flag('done');

        $scope.items = analysis_of_biding.make_price_statistic(biding_name);

        var bid_result = analysis_of_biding.analyze_bid_data(biding_name);
        console.log('bid_result:'+bid_result);

        if(bid_result != null){
            $scope.show_footer_message = 'success_message';

            $scope.success_bid_name = bid_result[0].name;
            $scope.success_bid_price = bid_result[0].price;
            $scope.success_bid_person_phone = bid_result[0].phone;
        }
        else{
            $scope.show_footer_message = 'fail_message';
        }

        $scope.back_to_bid_list = function() {
            Biding.set_bid_statistics_flag('undone');
            $location.path('/biding_list/' + Activity.get_current_activity().name);
        }

        $scope.count_data_button = function() {
            $location.path('/price_result/'+biding_name);
        }

    });