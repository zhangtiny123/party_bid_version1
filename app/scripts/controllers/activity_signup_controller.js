/**
 * Created by tiny on 14-7-15.
 */
'use strict';
angular.module('partyBidApp')
    .controller('activitySignUpCtrl',function($scope,$location,$routeParams){

        var current_activity_name = $routeParams.activity_name;
        var current_activity_sign_status = Activity.find_activity_sign_status_by_name(current_activity_name);
        var current_activity_bid_status = Activity.find_activity_bid_status_by_name(current_activity_name);
        var signing_start_tag_value = Activity.get_signing_start_tag();

        if (current_activity_sign_status==1 || current_activity_bid_status==1){
            $scope.button_name = 'end';
        }
        else {
            $scope.button_name = 'start';
        }

        $scope.is_button_enable = !((current_activity_sign_status==1 && signing_start_tag_value==1)
            || (current_activity_bid_status!=1 && signing_start_tag_value==0&& !Biding.has_bid_going()));

        $scope.number_of_sign = Person.read_person_signed_list(current_activity_name).length;

        $scope.persons = Person.read_person_signed_list(current_activity_name).reverse();

        $scope.start_sign_up = function() {
            $scope.button_name = 'end';
            Activity.activity_sign_start();
        };

        $scope.end_sign_up = function() {
            if (confirm('确定要结束此次报名吗？')){
                current_activity_sign_status = 2;
                Activity.activity_sign_end();
                $location.path('/biding_list/'+current_activity_name);
            }
            else{
                $scope.buttonName = 'end';
            }
        };

        $scope.back_to_activityList = function() {
            $location.path('/activity_list');
        };

        $scope.click_sign_up = function(){

        };

        $scope.click_biding = function(){
            $location.path('/biding_list/'+current_activity_name);
        }
    });