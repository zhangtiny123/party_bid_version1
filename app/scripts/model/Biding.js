/**
 * Created by tiny on 14-7-30.
 */
function Biding(biding_name,biding_status){
    this.name = biding_name;
    this.status = biding_status;
}


Biding.prototype.save_new_biding = function(current_activity_name){
    var biding_item = {'name':this.name,'status':this.status};
    var biding_list = JSON.parse(localStorage[current_activity_name+'-bid']);
    biding_list.push(biding_item);
    localStorage[current_activity_name+'-bid'] = JSON.stringify(biding_list);
};

Biding.get_biding_list_for_show = function(activity_name,stored_tail) {
    var biding_list = JSON.parse(localStorage[activity_name+stored_tail]);
    var count = 1;
    for (var i=0; i<biding_list.length; i++){
        if (count < 10){
            biding_list[i].name = biding_list[i].name.slice(-3);
            count += 1;
        }
        else if(count > 9) {
            biding_list[i].name = biding_list[i].name.slice(-4);
            count += 1;
        }
    }
    return biding_list.reverse();
};

Biding.get_biding_list = function(activity_name,stored_tail) {

    return JSON.parse(localStorage[activity_name+stored_tail]);
};

Biding.get_biding_status_by_name = function(biding_name) {
    var current_activity_name = Activity.get_current_activity();
    var biding_list = JSON.parse(localStorage[current_activity_name+'-bid']);

    return _.find(biding_list, function(biding){
        return biding.name == biding_name;
    }).status;
};

Biding.has_bid_going = function() {
    return JSON.parse(localStorage['biding_start_tag']) == 1;
};

Biding.get_bid_start_tag = function() {
    return JSON.parse(localStorage['biding_start_tag']);
};

Biding.set_bid_start_tag = function(tag_value) {
    var tag = Biding.get_bid_start_tag();
    tag = tag_value;
    localStorage['biding_start_tag'] = JSON.stringify(tag);
};

Biding.get_biding_bid = function() {
    return JSON.parse(localStorage['biding_bid']);
};

Biding.get_bid_person_list = function(bid_name) {
    return JSON.parse(localStorage[bid_name]);
};

Biding.set_biding_bid = function(biding_object){
    localStorage['biding_bid'] = JSON.stringify(biding_object);
};

Biding.set_biding_bid_status = function(status_value) {
    var biding_bid = Biding.get_biding_bid();
    biding_bid.status = status_value;
    localStorage['biding_bid'] = JSON.stringify(biding_bid);
};

Biding.set_bid_person_list = function(bid_name, bid_person_item) {
    var bid_list = JSON.parse(localStorage[bid_name]);
    bid_list.push(bid_person_item);
    localStorage[bid_name] = JSON.stringify(bid_list);
};

Biding.find_status_by_name = function(biding_name) {
    var current_activity = Activity.get_current_activity();
    var current_activity_bid_list = Biding.get_biding_list(current_activity.name, '-bid');

    return _.find(current_activity_bid_list, function(biding){
        return biding.name == biding_name;
    }).status;
};

Biding.set_status_by_name = function(biding_name,status_value) {

    var current_activity = Activity.get_current_activity();
    var current_activity_bid_list = Biding.get_biding_list(current_activity.name, '-bid');

    _.find(current_activity_bid_list, function(biding){
        return biding.name == biding_name;
    }).status = status_value;
    localStorage[current_activity.name+'-bid'] = JSON.stringify(current_activity_bid_list);
};

Biding.end_bid = function(biding_name) {
    var current_activity = Activity.get_current_activity();

    Biding.set_bid_start_tag(0);
    Biding.set_status_by_name(biding_name, 2);
    Biding.set_biding_bid_status(2);

    current_activity.bid_status = 2;
    Activity.set_current_activity(current_activity);
};

Biding.set_bid_statistics_flag = function(flag) {
    localStorage['bid_statistics_flag'] = JSON.stringify(flag);
};

Biding.get_bid_statistics_flag = function() {
    return JSON.parse(localStorage['bid_statistics_flag']);
};