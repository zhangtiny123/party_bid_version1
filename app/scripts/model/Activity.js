/**
 * Created by tiny on 14-7-23.
 */
function Activity(activity_name,activity_status) {
    this.nameof_activity = activity_name;
    this.activity_status = activity_status;   //activities的值表示活动的不同状态，’0'表示未开始，‘1'表示正在报名，’2'表示活动已结束

}


/**
 * 获取存储在本地的当前活动名称
 * @returns {current_activity_name}
 */
//activity.get_current_activity = function() {
//    return JSON.parse(localStorage['current_activity_name']);
//}

