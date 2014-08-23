/**
 * Created by tiny on 14-8-6.
 */
'use strict';

angular.module('partyBidApp')
    .controller('priceResultCtrl',function($scope,$location,$timeout,$routeParams){
        var get_bid_name = $routeParams.biding_name;

        $scope.bid_name =  get_bid_name.slice(-3);
        $scope.number_of_bid = Biding.get_bid_person_list(get_bid_name).length;
        $scope.foot_message = false;

        $scope.count_data_button =  function() {
            return $location.path('/price_statistics/'+get_bid_name);
        };

        var bid_result = analysis_of_biding.analyze_bid_data(get_bid_name);

        if (bid_result != null){
            $scope.success_bid_name = bid_result[0].name;
            $scope.success_bid_price = bid_result[0].price;
            $scope.success_bid_person_phone = bid_result[0].phone;
        }

        var flag = Biding.get_bid_statistics_flag();

        if( flag != 'done'){
            if(bid_result != null){
                $("#my_success_modal").modal('show',{backdrop:false});
                $timeout(function(){
                    $("#my_success_modal").modal("hide");
                    $scope.foot_message = true;
                    $scope.show_footer_message = 'success_message';
                },3000);

            }
            else{
                $("#my_failure_modal").modal('show',{backdrop:false});
                $timeout(function(){
                    $("#my_failure_modal").modal("hide");
                    $scope.foot_message = true;
                    $scope.show_footer_message = 'fail_message';
                },3000);
            }
        }
        else{
            if (bid_result != null) {
                $scope.foot_message = true;
                $scope.show_footer_message = 'success_message';
            }
            else {
                $scope.foot_message = true;
                $scope.show_footer_message = 'fail_message';
            }

        }

        $scope.persons = analysis_of_biding.sort_by_price(get_bid_name);

        $scope.is_button_enable = function() {

        };

        $scope.back_to_bid_list = function() {
            Biding.set_bid_statistics_flag('undone');
            $location.path('/biding_list/' + Activity.get_current_activity().name);
        }
    });