/**
 * Created by tiny on 14-7-23.
 */
function Activity(activity_name, activity_sign_status, activity_bid_status) {
    this.name = activity_name;
    this.sign_status = activity_sign_status;   //表示活动报名的不同状态，’0'表示未开始，‘1'表示正在报名，’2'表示活动已结束
    this.bid_status = activity_bid_status;    //表示活动竞价的不同状态，’0'表示未开始，‘1'表示正在报名，’2'表示活动已结束
}


Activity.prototype.save_new_activity = function() {
    var signed_person_item = {'name':this.name,'sign_status':this.sign_status,'bid_status':this.bid_status};
    var get_saved_activities = JSON.parse(localStorage['activities']);
    get_saved_activities.push(signed_person_item);
    localStorage['activities'] = JSON.stringify(get_saved_activities);
};

Activity.get_current_activity = function() {
    var current_activity = JSON.parse(localStorage['current_activity']);
    return current_activity;
};

Activity.set_current_activity = function(current_value) {
    localStorage['current_activity'] = JSON.stringify(current_value);
};

Activity.set_current_activity_bid_status = function(status_value) {
    var current_activity = Activity.get_current_activity();
    current_activity.bid_status = status_value;
    Activity.set_current_activity(current_activity);
};

Activity.set_current_activity_sign_status = function(status_value) {
    var current_activity = Activity.get_current_activity();
    current_activity.sign_status = status_value;
    Activity.set_current_activity(current_activity);
};

Activity.find_activity_sign_status_by_name = function(activity_name) {
    var activities = JSON.parse(localStorage['activities']);
    return _.find(activities, function(activity){
        return activity.name == activity_name;
    }).sign_status;
};

Activity.set_activity_sign_status_by_name = function(activity_name,sign_status_value) {
    var activities = JSON.parse(localStorage['activities']);
    _.find(activities, function(activity){
        return activity.name == activity_name;
    }).sign_status = sign_status_value;
    localStorage['activities'] = JSON.stringify(activities);
};


Activity.find_activity_bid_status_by_name = function(activity_name) {
    var activities = JSON.parse(localStorage['activities']);
    return _.find(activities, function(activity){
        return activity.name == activity_name;
    }).bid_status;
};

Activity.set_activity_bid_status_by_name = function(activity_name,bid_status_value) {
    var activities = JSON.parse(localStorage['activities']);
    _.find(activities, function(activity){
        return activity.name == activity_name;
    }).bid_status = bid_status_value;
    localStorage['activities'] = JSON.stringify(activities);
};

Activity.activity_list_for_show = function() {
    var get_all_activities =JSON.parse(localStorage['activities']);
    get_all_activities = get_all_activities.reverse();

    return get_all_activities;
};

Activity.get_signing_start_tag = function() {
    return JSON.parse(localStorage['signing_start_tag']);
};

Activity.set_signing_start_tag = function(tag_value) {
    var flag = Activity.get_signing_start_tag();
    flag = tag_value;
    localStorage['signing_start_tag'] = JSON.stringify(flag);
};

Activity.set_activity_signed_list = function(current_activity_name, person_item) {
    var result = Person.read_person_signed_list(current_activity_name);
    result.push(person_item);
    localStorage[current_activity_name+'-sign_up'] = JSON.stringify(result);
};

Activity.activity_sign_start = function() {
    Activity.set_signing_start_tag(1);

    var current_activity = Activity.get_current_activity();
    current_activity.sign_status = 1;
    Activity.set_current_activity(current_activity);

    Activity.set_activity_sign_status_by_name(current_activity.name, 1);
};

Activity.activity_sign_end = function() {
    Activity.set_signing_start_tag(0);

    var current_activity = Activity.get_current_activity();
    current_activity.sign_status = 2;
    Activity.set_current_activity(current_activity);

    Activity.set_activity_sign_status_by_name(current_activity.name, 2);
};

Activity.is_activity_repeated = function(new_activity) {
    var activities = JSON.parse(localStorage['activities']);
    return _.find(activities, function(activity){
        return activity.name == new_activity.name;
    }) != undefined;
};

Activity.has_activity_signing = function() {
    var flag = JSON.parse(localStorage['signing_start_tag']);

    return flag == 1;
};