/**
 * Created by tiny on 14-7-23.
 */

function Person (name,phone_num,price){
    this.name = name;
    this.phone = phone_num;
    this.biding_price = price;

}



Person.sign_ups_save = function(json_message){
    //读出json_message中的数据
    var person_name = json_message.messages[0].message.slice(2);
    var phone_number = json_message.messages[0].phone;

    //组成数组元素person_item
    var person_item = {'name':person_name,'phone':phone_number};
    var isStarted = (JSON.parse(localStorage['signing_start_tag']) == 1);
    var current_activity = JSON.parse(localStorage['current_activity']);


    if (!isStarted && (current_activity.activity_status == 0)){
        native_accessor.send_sms(phone_number,'活动尚未开始，请稍候……');
    }

    else if (!isStarted && (current_activity.activity_status == 2)){
        native_accessor.send_sms(phone_number,'活动已经结束');
    }

    else {
        var isNotRepeated = !Person.isRepeated(json_message,'signing_activity','-sign_up');

        if(isNotRepeated){
            var stored = JSON.parse(localStorage['signing_activity']).nameof_activity;
            var result = JSON.parse(localStorage[stored+'-sign_up']);


            result.push(person_item);
            localStorage[stored+'-sign_up'] = JSON.stringify(result);


            Person.signed_person_list_pageRefresh();
            native_accessor.send_sms(phone_number,'恭喜！报名成功');
        }
        else {
            native_accessor.send_sms(phone_number,'你已经报名成功，请勿重复报名');
        }
    }
}

Person.biding_save = function(json_message) {

    var bid_price = json_message.messages[0].message.slice(2);
    var phone_number = json_message.messages[0].phone;

    var is_signed = Person.is_signed_up(json_message);

    var is_bid_started = Biding.has_bid_going();
    var biding_bid = JSON.parse(localStorage['biding_bid']);


    if (!is_bid_started && (biding_bid.length==0 || biding_bid.biding_status==0)){
        native_accessor.send_sms(phone_number,'竞价尚未开始，请稍候……');
    }
    else if(!is_signed) {
        native_accessor.send_sms(phone_number,' 您未报名该活动');
    }

    else {
        console.log('进入此存储分支')
        var is_repeated = Person.isRepeated(json_message,'biding_bid');
        console.log('判断重复函数没有错误')
        if (is_repeated){
            native_accessor.send_sms(phone_number,'您已经竞价成功，请勿重复竞价！');
        }

        else if (!is_bid_started && biding_bid.biding_status==2){
            native_accessor.send_sms(phone_number,'本次竞价已经结束');
        }
        else {

            var bid_person_name = Person.get_signed_name(json_message);

            var bid_list_item = {'name':bid_person_name,'phone':phone_number,'price':bid_price};
            var bid_list = JSON.parse(localStorage[biding_bid.biding_name]);
            bid_list.push(bid_list_item);
            localStorage[biding_bid.biding_name] = JSON.stringify(bid_list);

            Person.biding_person_list_pageRefresh();

            native_accessor.send_sms(phone_number,'恭喜！您已出价成功！');
        }

    }
}

Person.get_signed_name = function(json_message) {
    var phone_number = json_message.messages[0].phone;
    var current_activity = JSON.parse(localStorage['current_activity']);
    var activity_signed_list = JSON.parse(localStorage[current_activity.nameof_activity+'-sign_up']);

    for (var i=0; i<activity_signed_list.length; i++){
        if (activity_signed_list[i].phone == phone_number){
            return activity_signed_list[i].name;
        }
    }

}

Person.is_signed_up = function(json_message) {
    var phone_number = json_message.messages[0].phone;
    var current_activity = JSON.parse(localStorage['current_activity']);
    var activity_signed_list = JSON.parse(localStorage[current_activity.nameof_activity+'-sign_up']);

    for (var i=0; i<activity_signed_list.length; i++){
        if (activity_signed_list[i].phone == phone_number){
            return true;
        }
    }
    return false;
}



Person.isRepeated = function(json_message,stored_name,find_tail) {

    console.log(stored_name)
    if (stored_name == 'signing_activity'){
        var r_temp = JSON.parse(localStorage[stored_name]).nameof_activity;
        var item_temp = JSON.parse(localStorage[r_temp+find_tail]);
    }
    else{
        var r_temp = JSON.parse(localStorage[stored_name]).biding_name;
        var item_temp = JSON.parse(localStorage[r_temp]);
    }





//    var person_name = json_message.messages[0].message.slice(2);
    var phone_number = json_message.messages[0].phone;

    for (var i=0; i < item_temp.length; i++){
        if ( item_temp[i].phone == phone_number){
            return true;
        }

    }
    return false;
}



Person.read_person_item = function(current_activity_name) {

    var read_temp1 = JSON.parse(localStorage[current_activity_name+'-sign_up']);

    return read_temp1;
}


Person.signed_person_list_pageRefresh = function() {
    var refresh_page = document.getElementById("sign_wrapper");
    if (refresh_page) {
        var scope = angular.element(refresh_page).scope();
        scope.$apply(function () {
            var during_name = JSON.parse(localStorage['current_activity']).nameof_activity;
            var result = JSON.parse(localStorage[during_name+'-sign_up']);
            result = result.reverse();
            scope.persons= result;
            scope.number_of_sign=result.length;
        })
    }
}

Person.biding_person_list_pageRefresh = function() {
    var refresh_page = document.getElementById("biding_wrapper");
    if (refresh_page) {
        var scope = angular.element(refresh_page).scope();
        scope.$apply(function () {
            var during_name = JSON.parse(localStorage['biding_bid']).biding_name;
            var result = JSON.parse(localStorage[during_name]);
            result = result.reverse();
            scope.persons= result;
            scope.number_of_bid = result.length;
        })
    }
}