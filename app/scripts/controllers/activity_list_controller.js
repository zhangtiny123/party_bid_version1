/**
 * Created by tiny on 14-7-15.
 */
'use strict'
angular.module('partyBidApp')
    .controller('activityListCtrl',function($scope,$location){

        /**
         * 判断localStorage是否为空
         */
        var conner = localStorage.length;
        if (conner==0){
            $location.path('/create_activity');
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

        var arr1=JSON.parse(localStorage['activities']);
        arr1 = arr1.reverse();
        $scope.activities=arr1;


    });