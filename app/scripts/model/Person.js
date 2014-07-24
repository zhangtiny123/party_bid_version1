/**
 * Created by tiny on 14-7-23.
 */

function Person (name,phone_num){
    this.name = name;
    this.phone = phone_num;
}

Person.save = function(json_message){

    //读出json_message中的数据
    var person_name = json_message.messages[0].message.slice(2);
    var phone_number = json_message.messages[0].phone;

    //组成数组元素person_item
    var person_item = {'name':person_name,'phone':phone_number};

    //读出当前活动名作为其报名列表的数组名
    var stored = JSON.parse(localStorage['current_activity']).nameof_activity;   //'stored‘ is the name of activity
    var result = JSON.parse(localStorage[stored]);                    //’result‘ is the stored contacts and phone number

    result.push(person_item);

    localStorage[stored] = JSON.stringify(result);


}

Person.read_person_item = function() {
    var read_temp = JSON.parse(localStorage['current_activity']).nameof_activity;
    var read_temp1 = JSON.parse(localStorage[read_temp]);

    return read_temp1;
}