/**
 * Created by tiny on 14-7-30.
 */
function Biding(biding_name,biding_status){
    this.biding_name = biding_name;
    this.biding_status = biding_status;
}

Biding.get_biding_list = function() {

}

Biding.biding_create = function(new_biding,biding_list_name) {
    var get_saved_bidings = JSON.parse(localStorage[biding_list_name]);
    get_saved_bidings.push(new_biding);
    localStorage[biding_list_name] = JSON.stringify(get_saved_bidings);
}


Biding.has_bid_going = function() {
    var bid_start_tag = JSON.parse(localStorage['biding_start_tag']);

    if (bid_start_tag == 1){
        return true;
    }
    else{
        return false;
    }
}

Biding.current_going_bid = function() {

    var current_biding = JSON.parse(localStorage['biding_bid']);
    var length_of_biding_name = current_biding.biding_name.length;
    var current_biding_activity_name = current_biding.biding_name.slice(0,length_of_biding_name-3);

    if(current_biding.biding_status == 1){
        return current_biding_activity_name;
    }
    else{
        return null;
    }

}

Biding.end_bid = function(biding_name) {
    var current_activity = JSON.parse(localStorage['current_activity']);
    var current_bid_list = JSON.parse(localStorage[current_activity.nameof_activity+'-bid']);
    var biding_bid = JSON.parse(localStorage['biding_bid']);


    for (var i=0; i<current_bid_list.length; i++) {
        if (current_bid_list[i].biding_name == biding_name){
            current_bid_list[i].biding_status = 0;
        }
    }
    localStorage[current_activity.nameof_activity+'-bid'] = JSON.stringify(current_bid_list);

    biding_bid.biding_status = 0;
    localStorage['biding_bid'] = JSON.stringify(biding_bid);
}