/**
 * Created by tiny on 14-7-23.
 */
function Activity(activity_name,activity_status) {
    this.nameof_activity = activity_name;
    this.activity_status = activity_status;   //activities的值表示活动的不同状态，’0'表示未开始，‘1'表示正在报名，’2'表示活动已结束

}


Activity.activity_create = function(new_activity) {
    var get_saved_activities = JSON.parse(localStorage['activities']);
    get_saved_activities.push(new_activity);
    localStorage['activities'] = JSON.stringify(get_saved_activities);
}


Activity.get_current_activity = function() {
    var current_activity = JSON.parse(localStorage['current_activity']);

    return current_activity;
}

Activity.is_the_activity_sign_end = function(activity_name) {
    var the_activities = JSON.parse(localStorage['activities']);

    for (var i=0; i<the_activities.length; i++) {
        if (the_activities[i].nameof_activity==activity_name && the_activities[i].activity_status==2) {
            return true;
        }
    }
    return false;
}


Activity.activity_start = function() {
    localStorage['signing_start_tag'] = JSON.stringify(1);


    //将current_activity的activity_status设置为1,即正在报名
    var get_current_activity = JSON.parse(localStorage['current_activity']);
    get_current_activity.activity_status = 1;
    localStorage['current_activity'] = JSON.stringify(get_current_activity);


    //将正在报名的活动设置为当前活动
    var transform_temp = JSON.parse(localStorage['current_activity']);
    console.log('run this trans line');
    localStorage['signing_activity'] = JSON.stringify(transform_temp);


    //将activities中的当前报名中的活动状态设置为1,即正在报名
    var get_activities = JSON.parse(localStorage['activities']);
    console.log('run the get method');
    for (var i=0; i<get_activities.length; i++){
        if (get_activities[i].nameof_activity == get_current_activity.nameof_activity){
            get_activities[i].activity_status = 1;
        }
    }
    localStorage['activities'] = JSON.stringify(get_activities);
}



Activity.activity_end = function() {
    localStorage['signing_start_tag'] = JSON.stringify(0);

    var get_signing_activity = JSON.parse(localStorage['signing_activity']);
    get_signing_activity.activity_status = 2;
    localStorage['signing_activity'] = JSON.stringify(get_signing_activity);


    //将current_activity的activity_status设置为2,即报名已经结束
    var get_current_activity = JSON.parse(localStorage['current_activity']);
    get_current_activity.activity_status = 2;
    localStorage['current_activity'] = JSON.stringify(get_current_activity);


    //将activities中的当前报名中的活动状态设置为2,即报名已经结束
    var get_activities = JSON.parse(localStorage['activities']);
    for (var i=0; i<get_activities.length; i++){
        if (get_activities[i].nameof_activity == get_signing_activity.nameof_activity){
            get_activities[i].activity_status = 2;
        }
    }
    localStorage['activities'] = JSON.stringify(get_activities);
}




Activity.activity_list_for_show = function() {
    var get_all_activities =JSON.parse(localStorage['activities']);
    get_all_activities = get_all_activities.reverse();

    return get_all_activities;
}



Activity.isRepeated = function(new_activity) {
    var get_saved_activities = JSON.parse(localStorage['activities']);;
    for (var i=0; i<get_saved_activities.length; i++){
        if (get_saved_activities[i].nameof_activity == new_activity.nameof_activity){
            return true;
        }
    }
    return false;
}