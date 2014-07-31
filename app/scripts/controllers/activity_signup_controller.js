/**
 * Created by tiny on 14-7-15.
 */
'use strict'
angular.module('partyBidApp')
    .controller('activitySignUpCtrl',function($scope,$location,$routeParams){

        var current_activity_status = JSON.parse(localStorage['current_activity']).activity_status;
        var current_activity_name = JSON.parse(localStorage['current_activity']).nameof_activity;
        var signing_start_tag_value = JSON.parse(localStorage['signing_start_tag']);
        var signing_activity_status = JSON.parse(localStorage['signing_activity']).activity_status;




        if (signing_activity_status==1 && current_activity_status==1){
            $scope.button_name = 'end';
        }
        else {
            $scope.button_name = 'start';
        }


        $scope.is_button_enable = function() {
            if ((current_activity_status==1 && signing_start_tag_value==1) || (current_activity_status==0 && signing_start_tag_value==0)) {
                return false;
            }
            else {
                return true;
            }
        }

        $scope.start_sign_up = function() {
            $scope.button_name = 'end';
            Activity.activity_start();
        }

        $scope.end_sign_up = function() {
            var con = confirm('确定要结束此次报名吗？');
            if (con == true){
                $scope.button_name = 'start';
                current_activity_status = 2;
                Activity.activity_end();
                $location.path('/biding_list/'+current_activity_name);
            }
            else{
                $scope.buttonName = 'end';
            }
        }

        $scope.number_of_sign = Person.read_person_item().length;

        $scope.persons = Person.read_person_item().reverse();

        $scope.back_to_activityList = function() {
            $location.path('/activity_list');
        }

        $scope.click_sign_up = function(){
            $location.path('/activity_sign_up');
        }

        $scope.click_biding = function(){

        }
    });