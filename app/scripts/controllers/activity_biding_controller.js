/**
 * Created by tiny on 14-7-30.
 */
'use strict';
angular.module('partyBidApp')
    .controller('activityBidingCtrl',function($scope,$location,$routeParams){
        var bid_name = $routeParams.biding_name;
        var current_activity_name = Activity.get_current_activity().name;
        var biding_list = Biding.get_biding_list(current_activity_name,'-bid');

        for (var i=0; i<biding_list.length; i++) {
            if ((bid_name==biding_list[i].name) && i<9){
                $scope.bid_name = bid_name.slice(-3);
                break;
            }
            else if (i> 8){
                $scope.bid_name = bid_name.slice(-4);
                break;
            }
        }

        $scope.number_of_bid = Biding.get_bid_person_list(bid_name).length;
        $scope.persons = Biding.get_bid_person_list(bid_name);

        $scope.back_to_bid_list = function() {
            $location.path('/biding_list/'+current_activity_name);
        };

        $scope.stop_biding = function() {
            if (confirm('确定要结束此次竞价吗？')) {
                Biding.end_bid(bid_name);
                Activity.set_activity_bid_status_by_name(current_activity_name, 2)

                $location.path('/price_result/' + bid_name);
            }
        };

        $scope.is_end_enable = function() {
            var current_bid_list = Biding.get_biding_list(current_activity_name,'-bid');

            for (var i=0; i<current_bid_list.length; i++){
                if (current_bid_list[i].name==bid_name && (current_bid_list[i].status==0 || current_bid_list[i].status==2)){
                    return true;
                }
            }
            return false;
        }
    });