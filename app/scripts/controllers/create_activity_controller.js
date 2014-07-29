/**
 * Created by tiny on 14-7-15.
 */
'use strict'
angular.module('partyBidApp')
    .controller('createActivityCtrl',function($scope,$location){




        if(localStorage.length==0){
            var arr=[];
            localStorage['activities']=JSON.stringify(arr);

            //作为是否有活动开始标志
            localStorage['start_tag'] = JSON.stringify(0);
        }


        if (JSON.parse(localStorage['activities']).length==0){
            $scope.ifnotback=false;
        }
        else {
            $scope.ifnotback=true;
        }



        $scope.add_new_activity = function(){

            var activity_created = new Activity($scope.activityName,0);

            if (Activity.isRepeated(activity_created)){
                $scope.alert_message = '活动名称重复';
                $scope.activityName = null;
            }

            else {
                Activity.activity_create(activity_created);

                //再单独存一组当前输入的活动名称
                localStorage['current_activity'] = JSON.stringify(activity_created);

                //保存当前正在进行报名的活动
                localStorage['signing_activity'] = JSON.stringify([]);

                //作为报名者信息存储用
                localStorage[$scope.activityName] = JSON.stringify([]);

                //作为是否有活动开始标志
                localStorage['start_tag'] = JSON.stringify(0);
                $location.path('/activity_sign_up/'+activity_created.nameof_activity);
            }

//            //判断是否与已有活动名重复
//            var temp = JSON.parse(localStorage['activities']);;
//            for (var i=0; i<temp.length; i++){
//                if (temp[i] == $scope.activityName){
//                    tag = 1;
//                }
//            }
//
//
//            if (tag == 0) {
//                var activity_created = new Activity($scope.activityName,0);
//
//                temp.push(activity_created);
//                localStorage['activities'] = JSON.stringify(temp);
//
//                //再单独存一组当前输入的活动名称
//                localStorage['current_activity'] = JSON.stringify(activity_created);
//
//                //保存当前正在进行报名的活动
//                localStorage['signing_activity'] = JSON.stringify([]);
//
//                //作为报名者信息存储用
//                localStorage[$scope.activityName] = JSON.stringify([]);
//
//                //作为是否有活动开始标志
//                localStorage['start_tag'] = JSON.stringify(0);
//                $location.path('/activity_sign_up');
//            }
//            else{
//                $scope.alert_message = '活动名称重复';
//                $scope.activityName = null;
//                tag = 0;
//            }



        }

        $scope.back_to_list = function() {
            $location.path('/activity_list')
        }



    });