/**
 * Created by tiny on 14-7-15.
 */
'use strict';
angular.module('partyBidApp')
    .controller('createActivityCtrl',function($scope,$location){
        if(localStorage.length==0){
            init.initial_no_relied_key();
        }
        $scope.is_showing = !(Activity.activity_list_for_show().length==0);

        $scope.add_new_activity = function(){
            var activity_created = new Activity($scope.activity_name,0,0);

            if (Activity.is_activity_repeated(activity_created)){
                $scope.alert_message = '活动名称重复,请重新输入。。。';
                $scope.activity_name = null;
            }
            else {
                activity_created.save_new_activity();
                Activity.set_current_activity(activity_created);
                init.initial_rely_activity_name_key($scope.activity_name);
                $location.path('/activity_sign_up/'+activity_created.name);
            }
        };

        $scope.back_to_list = function() {
            $location.path('/activity_list');
        }
    });