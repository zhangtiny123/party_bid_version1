/**
 * Created by tiny on 14-7-15.
 */
'use strict'
angular.module('partyBidApp')
    .controller('activitySignUpCtrl',function($scope,$location){
        if (JSON.parse(localStorage['start_tag']) == 0 ){
            $scope.buttonName='开始';
        }
        else{
            $scope.buttonName='结束';
        }


        $scope.start_sign_up = function() {

            if ($scope.buttonName == '开始'){
                $scope.buttonName='结束';
//                var val3 = JSON.parse(localStorage['start_tag']);
                localStorage['start_tag'] = JSON.stringify(1);
            }
            else{
                var con = confirm('确定要结束此次报名吗？');

                if (con == true){
                    $scope.buttonName = '开始';
                    localStorage['start_tag'] = JSON.stringify(0);
                }
                else{
                    $scope.buttonName = '结束';
                }

            }
        }

        $scope.num_of_sign = Person.read_person_item().length;


        var stored_name = JSON.parse(localStorage['current_activity']);
        console.log(stored_name);
        $scope.persons = (JSON.parse(localStorage[stored_name.nameof_activity])).reverse();



//        $scope.activity_name=localStorage.getItem('activity_name');

        $scope.back_to_activityList = function() {
            $location.path('/activity_list');
        }

        $scope.click_sign_up = function(){
            $location.path('/activity_sign_up');
        }

        $scope.click_biding = function(){

        }
    });