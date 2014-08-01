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
            $scope.activities=Activity.activity_list_for_show();
        }

        if (localStorage.length != 0) {
            var signing_activity_status = JSON.parse(localStorage['signing_activity']).activity_status;
        }



        /**
         *
         * function has_current_bid_going()还未实现！！！
         */
        $scope.current_biding_activity = Biding.has_going_bid_activity();


        $scope.is_create_button_enable = function() {
            if (signing_activity_status == 1 || Biding.has_bid_going()){
                return true;
            }
            else {
                return false;
            }
        }


        $scope.create_activity = function(){
            $location.path('/create_activity');
        }

        $scope.click_event = function(value1) {



            var p_temp = new Activity(value1.nameof_activity,value1.activity_status);

            if (p_temp.activity_status==0 || p_temp.activity_status==1){
                localStorage['current_activity'] = JSON.stringify(p_temp);


                $location.path('/activity_sign_up/'+p_temp.nameof_activity);
            }
            else {
                localStorage['current_activity'] = JSON.stringify(p_temp);
                $location.path('/biding_list/'+p_temp.nameof_activity)
            }


        }




    });