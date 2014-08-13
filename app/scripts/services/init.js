/**
 * Created by tiny on 14-8-6.
 */

 var init = {
    initial_no_relied_key:function() {
        localStorage['activities']=JSON.stringify([]);

        //再单独存一组当前输入的活动名称
        localStorage['current_activity'] = JSON.stringify([]);

        //保存当前正在竞价的竞价
        localStorage['biding_bid'] = JSON.stringify([]);

        //作为是否有活动开始标志
        localStorage['signing_start_tag'] = JSON.stringify(0);

        //作为是否有竞价开始的标志
        localStorage['biding_start_tag'] = JSON.stringify(0);

        localStorage['bid_statistics_flag'] = JSON.stringify([]);
    },
    initial_rely_activity_name_key:function(activity_name) {
        //作为报名者信息存储用
        localStorage[activity_name+'-sign_up'] = JSON.stringify([]);

        //作为存储对应活动有哪些竞价
        localStorage[activity_name+'-bid'] = JSON.stringify([]);
    },
    initial_rely_bid_name_key:function(bid_name) {
        localStorage[bid_name] = JSON.stringify([]);
    }


};
