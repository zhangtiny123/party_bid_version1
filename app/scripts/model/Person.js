/**
 * Created by tiny on 14-7-23.
 */

function Person (name,phone_num){
    this.name = name;
    this.phone = phone_num;
}


/**********************************************************************************************************************
 * description: 在活动正在进行报名且满足报名条件的，存储报名信息到localStorage
 * @param json_message
 */
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
    var isRightChar = (start_chars == 'bm' || start_chars == 'BM');
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

            //读出当前活动名作为其报名列表的数组名
            var stored = JSON.parse(localStorage['signing_activity']).nameof_activity;
            var result = JSON.parse(localStorage[stored]);


            result.push(person_item);

            localStorage[stored] = JSON.stringify(result);


            Page_Refresh();
            native_accessor.send_sms(phone_number,'恭喜！报名成功');
        }
        else {
            native_accessor.send_sms(phone_number,'你已经报名成功，请勿重复报名');
        }

    }

}


/**********************************************************************************************************************
 * description: 判断是否重复报名
 * @param json_message
 * @returns {boolean}
 */
Person.isRepeated = function(json_message) {

    var r_temp = JSON.parse(localStorage['signing_activity']).nameof_activity;
    var item_temp = JSON.parse(localStorage[r_temp]);

    var person_name = json_message.messages[0].message.slice(2);
    var phone_number = json_message.messages[0].phone;

    for (var i=0; i < item_temp.length; i++){
        if (item_temp[i].name == person_name && item_temp[i].phone == phone_number){
            return true;

        }

    }
    return false;
}


/**********************************************************************************************************************
 * description: 返回当前活动已报名的列表
 * @returns {person_item}返回报名名单信息的数组
 */
Person.read_person_item = function() {
    var read_temp = JSON.parse(localStorage['current_activity']).nameof_activity;
    var read_temp1 = JSON.parse(localStorage[read_temp]);

    return read_temp1;
}