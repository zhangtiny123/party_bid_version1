/**
 * Created by tiny on 14-7-30.
 */
'use strict'
angular.module('partyBidApp')
    .controller('bidingListCtrl',function($scope,$location,$routeParams){

        var passed_activity_name = $routeParams.activity_name;
//        console.log(passed_activity_name);
//        console.log('hehe');
//        $scope.bidings = JSON.parse(localStorage['']);

        $scope.back_to_activity_list = function() {
            $location.path('/activity_list');
        }

        $scope.to_biding_page = function() {
            $location.path('/activity_biding');
        }

        $scope.start_bid = function() {
            //将竞价信息存储进activity-bid
            //创建对应的竞价报价列表存储参与竞价的人的信息
            //判断参与竞价的是否已经报名活动
            //将竞价开始标志修改

            var biding_list = JSON.parse(localStorage[passed_activity_name+'-bid']);
            var new_biding = new Biding('竞价'+(biding_list.length+1),0);
            biding_list.push(new_biding);
            localStorage[passed_activity_name+'-bid'] = JSON.stringify(biding_list);



            localStorage[new_biding.biding_name] = JSON.stringify([]);
            localStorage['biding_bid'] = JSON.stringify(new_biding);


            var bid_start_tag = JSON.parse(localStorage['biding_start_tag']);
            bid_start_tag = 1;
            localStorage['biding_start_tag'] = JSON.stringify(bid_start_tag);


            $location.path('/activity_biding/'+new_biding.biding_name);
        }
    });