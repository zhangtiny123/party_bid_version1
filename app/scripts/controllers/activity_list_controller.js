/**
 * Created by tiny on 14-7-15.
 */
'use strict'
angular.module('partyBidApp')
    .controller('activityListCtrl',function($scope,$location){
        var conner = localStorage.getItem('activities');
        if (conner == null){
            $location.path('/create_activity');
        }

        $scope.crea_activity = function(){
            $location.path('/create_activity');
        }
        $scope.skip_to_activitySignUp = function() {
            $location.path('/activity_sign_up');
        }

        var arr1=JSON.parse(localStorage['activities']);
        arr1 = arr1.reverse();
        $scope.activities=arr1;

    });