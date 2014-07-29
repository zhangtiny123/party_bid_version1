/**
 * Created by tiny on 14-7-15.
 */
'use strict'
angular.module('partyBidApp')
    .controller('activityListCtrl',function($scope,$location){

        var signing_activity_status = JSON.parse(localStorage['signing_activity']).activity_status;


        var conner = localStorage.length;
        if (conner==0){
            $location.path('/create_activity');
        }
        else {
            $scope.activities=Activity.activity_list_for_show();
        }


        $scope.is_create_button_enable = function() {
            if (signing_activity_status == 1){
                return true;
            }
            else {
                return false;
            }
        }


        $scope.create_activity = function(){
            $location.path('/create_activity');
        }

        $scope.to_activitySignUp = function(value1) {

            var p_temp = new Activity(value1.nameof_activity,value1.activity_status);

            localStorage['current_activity'] = JSON.stringify(p_temp);

            $location.path('/activity_sign_up');
//            console.log(val1);
        }




    });