/**
 * Created by tiny on 14-8-6.
 */
'use strict';

angular.module('partyBidApp')
    .controller('priceResultCtrl',function($scope,$location,$timeout,$routeParams){
        var get_bid_name = $routeParams.biding_name;

        $scope.bid_name =  get_bid_name.slice(-3);
        $scope.number_of_bid = Biding.get_bid_person_list(get_bid_name).length;

        var bid_result = analysis_of_biding.analyze_bid_data(get_bid_name)[0];
        console.log(bid_result);

        $scope.persons = analysis_of_biding.sort_by_price(get_bid_name);

        $scope.success_bid_name = bid_result.name;
        console.log($scope.success_bid_name);
        $scope.success_bid_price = bid_result.price;
        $scope.success_bid_person_phone = bid_result.phone;

        $scope.foot_message = false;

        if(bid_result != null){
            $("#my_modal").modal('show');
            $timeout(function(){
                $("#my_modal").modal("hide");
                $scope.foot_message = true;
            },3000);

        }
        else{
            $("#my_modal1").modal('show');
            $timeout(function(){
                $("#my_modal1").modal("hide");
                $scope.foot_message = true;
            },3000);

        }


        $scope.count_data_button =  function() {
            $location.path('/price_statistics/'+get_bid_name);
        };

        $scope.is_button_enable = function() {

        };

        $scope.back_to_bid_list = function() {
            $location.path('/biding_list/' + Activity.get_current_activity().name);
        }
    });