/**
 * Created by tiny on 14-7-15.
 */
'use strict'
angular.module('partyBidApp')
    .controller('activityListCtrl',function($scope,$location){



        var conner = localStorage.length;
        if (conner==0){
            $location.path('/create_activity');
        }
        else {
            $scope.activities = Activity.activity_list_for_show();

            var signing_activity_status = Activity.get_current_activity().sign_status;

            $scope.current_biding_activity = Biding.has_going_bid_activity();

            $scope.is_create_button_enable = function () {
                if (signing_activity_status == 1 || Biding.has_bid_going()) {
                    return true;
                }
                else {
                    return false;
                }
            }

            $scope.create_activity = function () {
                $location.path('/create_activity');
            }

            $scope.click_event = function (value1) {
                var p_temp = new Activity(value1.name, value1.sign_status, value1.bid_status);

                if (!Activity.has_activity_signing() && !Biding.has_bid_going()) {
                    Activity.set_current_activity(p_temp);
                }

                $location.path('/activity_sign_up/' + p_temp.name);
            }
        }
    });