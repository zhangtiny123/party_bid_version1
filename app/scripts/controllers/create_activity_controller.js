/**
 * Created by tiny on 14-7-15.
 */
'use strict'
angular.module('partyBidApp')
    .controller('createActivityCtrl',function($scope,$location){
        if(localStorage.length==0){

            localStorage['activities']=JSON.stringify([]);

            //再单独存一组当前输入的活动名称
            localStorage['current_activity'] = JSON.stringify([]);

            //保存当前正在竞价的竞价
            localStorage['biding_bid'] = JSON.stringify([]);

            //作为是否有活动开始标志
            localStorage['signing_start_tag'] = JSON.stringify(0);

            //作为是否有竞价开始的标志
            localStorage['biding_start_tag'] = JSON.stringify(0);
        }

        if (Activity.activity_list_for_show().length==0){
            $scope.isShowing=false;
        }
        else {
            $scope.isShowing=true;
        }

        $scope.add_new_activity = function(){

            var activity_created = new Activity($scope.activityName,0,0);

            if (Activity.is_activity_repeated(activity_created)){
                $scope.alert_message = '活动名称重复';
                $scope.activityName = null;
            }

            else {
                activity_created.save_new_activity();

                Activity.set_current_activity(activity_created);

                //作为报名者信息存储用
                localStorage[$scope.activityName+'-sign_up'] = JSON.stringify([]);

                //作为存储对应活动有哪些竞价
                localStorage[$scope.activityName+'-bid'] = JSON.stringify([]);

                $location.path('/activity_sign_up/'+activity_created.name);
            }
        }

        $scope.back_to_list = function() {
            $location.path('/activity_list')
        }



    });