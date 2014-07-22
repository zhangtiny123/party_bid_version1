/**
 * Created by tiny on 14-7-15.
 */
'use strict'
angular.module('partyBidApp')
    .controller('activitySignUpCtrl',function($scope,$location){
        $scope.buttonName='开始';

        $scope.start_sign_up = function() {

            if ($scope.buttonName == '开始'){
                $scope.buttonName='结束';

            }
            else{
                var con = confirm('确定要结束此次报名吗？');
                console.log(con);
                if (con == true){
                    $scope.buttonName = '开始';
                }
                else{
                    $scope.buttonName = '结束';
                }

            }
        }

        $scope.activity_name=localStorage.getItem('activity_name');

        $scope.back_to_activityList = function() {
            $location.path('/activity_list');
        }

        $scope.click_sign_up = function(){
            $location.path('/activity_sign_up');
        }

        $scope.click_biding = function(){

        }
    });