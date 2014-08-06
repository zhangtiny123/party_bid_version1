/**
 * Created by tiny on 14-7-30.
 */
'use strict'
angular.module('partyBidApp')
    .controller('bidingListCtrl',function($scope,$location,$routeParams){

        var passed_activity_name = $routeParams.activity_name;
        var current_activity_name = Activity.get_current_activity().name;

        $scope.bidings = Biding.get_biding_list_for_show(passed_activity_name,'-bid');

        $scope.click_event = function(biding)  {
            $location.path('/activity_biding/'+passed_activity_name+biding.name);
        }


        $scope.back_to_activity_list = function() {
            $location.path('/activity_list');
        }

        $scope.is_start_button_enable = (Biding.has_bid_going() || Activity.find_activity_sign_status_by_name(current_activity_name)!=2);

        $scope.start_bid = function() {
            var biding_list = Biding.get_biding_list(passed_activity_name,'-bid');

            var new_biding = new Biding(passed_activity_name+'竞价'+(biding_list.length+1),1);
            new_biding.save_new_biding(passed_activity_name);

            Activity.set_activity_bid_status_by_name(passed_activity_name,1);

            var the_current_activity = Activity.get_current_activity()
            the_current_activity.bid_status = 1;
            Activity.set_current_activity(the_current_activity);

            localStorage[new_biding.name] = JSON.stringify([]);
            Biding.set_biding_bid(new_biding);

            Biding.set_bid_start_tag(1);

            $location.path('/activity_biding/'+new_biding.name);
        }

        $scope.click_sign_up = function() {
            $location.path('/activity_sign_up/'+passed_activity_name);
        }
    });