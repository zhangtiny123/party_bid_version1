/**
 * Created by tiny on 14-7-30.
 */
'use strict'
angular.module('partyBidApp')
    .controller('activityBidingCtrl',function($scope,$location,$routeParams){

        var bid_name = $routeParams.biding_name;
        var current_activity_name = Activity.get_current_activity().name;

        $scope.number_of_bid = JSON.parse(localStorage[bid_name]).length;
        $scope.number = 1;
        $scope.persons = JSON.parse(localStorage[bid_name]);

        $scope.back_to_bid_list = function() {
            $location.path('/biding_list/'+current_activity_name);
        }

        $scope.stop_biding = function() {
            var con = confirm('确定要结束此次竞价吗？');
            if (con == true){
                Biding.end_bid(bid_name);
                Activity.set_activity_bid_status_by_name(current_activity_name,2)
            }

        }

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