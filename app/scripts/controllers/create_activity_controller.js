/**
 * Created by tiny on 14-7-15.
 */
'use strict'
angular.module('partyBidApp')
    .controller('createActivityCtrl',function($scope,$location){


        var tag = 0; //用于判断输入活动名称是否和已有的重复的标志

        if(localStorage.length==0){
            var arr=[];
            localStorage['activities']=JSON.stringify(arr);
        }
        if (JSON.parse(localStorage['activities']).length==0){
            $scope.ifnotback=false;
        }
        else {
            $scope.ifnotback=true;
        }

        $scope.add_new_activity = function(){
            //读出数据，然后再存进去
            var temp = JSON.parse(localStorage['activities']);
            for (var i=0; i<temp.length; i++){
                if (temp[i] == $scope.activityName){
                    tag = 1;
                }
            }

            if (tag == 0) {
                temp.push($scope.activityName);
                localStorage['activities'] = JSON.stringify(temp);

                //再单独存一组当前输入的活动名称
                localStorage.setItem('activity_name', $scope.activityName);
                $location.path('/activity_sign_up');
            }
            else{
                $scope.alert_message = '活动名称重复';
                $scope.activityName = null;
                tag = 0;
            }



        }

        $scope.back_to_list = function() {
            $location.path('/activity_list')
        }



    });