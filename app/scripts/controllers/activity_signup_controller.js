/**
 * Created by tiny on 14-7-15.
 */
'use strict'
angular.module('partyBidApp')
    .controller('activitySignUpCtrl',function($scope,$location){


        if (JSON.parse(localStorage['start_tag']) == 0 || JSON.parse(localStorage['current_activity']).activity_status != 1){
//            console.log('start_tag'+JSON.parse(localStorage['start_tag']));
//            console.log(JSON.parse(localStorage['current_activity']).activity_status != 1);
            $scope.buttonName='开始';
        }
        else if(JSON.parse(localStorage['start_tag']) == 1 && JSON.parse(localStorage['current_activity']).activity_status == 1){
            $scope.buttonName='结束';
        }



        $scope.button_enable = !((JSON.parse(localStorage['current_activity']).activity_status==1 && JSON.parse(localStorage['start_tag']==1))
            || (JSON.parse(localStorage['start_tag'])==0 && JSON.parse(localStorage['current_activity']).activity_status==0))



        $scope.start_sign_up = function() {

            if ($scope.buttonName == '开始' && JSON.parse(localStorage['current_activity']).activity_status!=2){
                $scope.buttonName='结束';

                localStorage['start_tag'] = JSON.stringify(1);


                //将current_activity的activity_status设置为1,即正在报名
                var temp4 = JSON.parse(localStorage['current_activity']);
                temp4.activity_status = 1;
                localStorage['current_activity'] = JSON.stringify(temp4);


                //将正在报名的活动设置为当前活动

                var trans_temp = JSON.parse(localStorage['current_activity']);
//                console.log('当前活动：'+trans_temp)
                localStorage['signing_activity'] = JSON.stringify(trans_temp);



                //将activities中的当前报名中的活动状态设置为1,即正在报名
                var temp5 = JSON.parse(localStorage['activities']);
                for (var i=0; i<temp5.length; i++){
                    if (temp5[i].nameof_activity == temp4.nameof_activity){
                        temp5[i].activity_status = 1;
                    }
                }
                localStorage['activities'] = JSON.stringify(temp5);

            }
            else{
                var con = confirm('确定要结束此次报名吗？');

                if (con == true){
                    $scope.buttonName = '开始';
                    localStorage['start_tag'] = JSON.stringify(0);

                    var end_temp = JSON.parse(localStorage['signing_activity']);
                    end_temp.activity_status = 2;
                    localStorage['signing_activity'] = JSON.stringify(end_temp);


                    //将current_activity的activity_status设置为2,即报名已经结束
                    var temp6 = JSON.parse(localStorage['current_activity']);
                    temp6.activity_status = 2;
                    console.log('current_activity_status:'+temp6.activity_status);
                    localStorage['current_activity'] = JSON.stringify(temp6);


                    //将activities中的当前报名中的活动状态设置为2,即报名已经结束
                    var temp7 = JSON.parse(localStorage['activities']);
                    for (var i=0; i<temp7.length; i++){
                        if (temp7[i].nameof_activity == end_temp.nameof_activity){
                            temp7[i].activity_status = 2;
                        }
                    }
                    localStorage['activities'] = JSON.stringify(temp7);
                }
                else{
                    $scope.buttonName = '结束';
                }

            }
        }



        $scope.number_of_sign = Person.read_person_item().length;



        var stored_name = JSON.parse(localStorage['current_activity']);
        $scope.persons = (JSON.parse(localStorage[stored_name.nameof_activity])).reverse();



        $scope.back_to_activityList = function() {
            $location.path('/activity_list');
        }



        $scope.click_sign_up = function(){
            $location.path('/activity_sign_up');
        }



        $scope.click_biding = function(){

        }
    });