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

    else if (!isStarted && (curr.activity_status == 2)){
        native_accessor.send_sms(phone_number,'活动已经结束');
    }

    else {
        var isNotRepeated = !Person.isRepeated(json_message);

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

}



Person.isRepeated = function(json_message) {

    var r_temp = JSON.parse(localStorage['signing_activity']).nameof_activity;
    var item_temp = JSON.parse(localStorage[r_temp+'-sign_up']);

    var person_name = json_message.messages[0].message.slice(2);
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