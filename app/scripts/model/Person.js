/**
 * Created by tiny on 14-7-23.
 */

function Person (name,phone_num){
    this.name = name;
    this.phone = phone_num;
}



Person.save = function(json_message){
    console.log('runned save function');


    //读出json_message中的数据
    var start_chars = json_message.messages[0].message.slice(0,2);
    console.log('首字符'+start_chars);
    var person_name = json_message.messages[0].message.slice(2);
    var phone_number = json_message.messages[0].phone;


    //组成数组元素person_item
    var person_item = {'name':person_name,'phone':phone_number};


    var isStarted = (JSON.parse(localStorage['start_tag']) == 1);
    console.log('是否开始：'+isStarted);
    var isRightChar = (start_chars=='bm' || start_chars=='BM' || start_chars=='Bm' || start_chars=='bM');
    console.log('正确的开头：'+isRightChar);
    var curr = JSON.parse(localStorage['current_activity']);


    if (!isStarted && (curr.activity_status == 0)){
        native_accessor.send_sms(phone_number,'活动尚未开始，请稍候……');
    }

    else if (!isRightChar){
        native_accessor.send_sms(phone_number,'短信格式不正确！');
    }

    else if (!isStarted && (curr.activity_status == 2)){
        native_accessor.send_sms(phone_number,'活动已经结束');
    }

    else {
        var isNotRepeated = !Person.isRepeated(json_message);
        console.log('不重复:'+isNotRepeated);

        if(isNotRepeated){
            var stored = JSON.parse(localStorage['signing_activity']).nameof_activity;
            var result = JSON.parse(localStorage[stored]);


            result.push(person_item);
            localStorage[stored] = JSON.stringify(result);


            Person.signed_person_list_pageRefresh();
            native_accessor.send_sms(phone_number,'恭喜！报名成功');
        }
        else {
            native_accessor.send_sms(phone_number,'你已经报名成功，请勿重复报名');
        }

    }

}



Person.isRepeated = function(json_message) {

    var r_temp = JSON.parse(localStorage['signing_activity']).nameof_activity;
    var item_temp = JSON.parse(localStorage[r_temp]);

    var person_name = json_message.messages[0].message.slice(2);
    var phone_number = json_message.messages[0].phone;

    for (var i=0; i < item_temp.length; i++){
        if ( item_temp[i].phone == phone_number){
            return true;
        }

    }
    return false;
}



Person.read_person_item = function() {
    var read_temp = JSON.parse(localStorage['current_activity']).nameof_activity;
    var read_temp1 = JSON.parse(localStorage[read_temp]);

    return read_temp1;
}


Person.signed_person_list_pageRefresh = function() {
    var refresh_page = document.getElementById("sign_wrapper");
    if (refresh_page) {
        var scope = angular.element(refresh_page).scope();
        scope.$apply(function () {
            var during_name= JSON.parse(localStorage['current_activity']).nameof_activity;
            var result=JSON.parse(localStorage[during_name]);
            result = result.reverse();
            scope.persons= result;
            scope.number_of_sign=result.length;
        })
    }
}