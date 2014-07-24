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


        $scope.crea_activity = function(){
            $location.path('/create_activity');
        }

        $scope.skip_to_activitySignUp = function(val1) {
//            var current_value = localStorage.getItem('current_activity_name');
            localStorage['current_activity'] = JSON.stringify(val1);

            $location.path('/activity_sign_up');
            console.log(val1);
        }

        var arr1=JSON.parse(localStorage['activities']);
        arr1 = arr1.reverse();
        $scope.activities=arr1;

        $scope.current_activity_name = JSON.parse(localStorage['current_activity']).nameof_activity;
    });