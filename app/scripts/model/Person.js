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


    var start_chars = json_message.messages[0].message.slice(0,2);

    var isStarted = JSON.parse(localStorage['start_tag']) == 1;
    var isNotStart = JSON.parse(localStorage['current_activity']).activity_status == 0;
    var isSigning = JSON.parse(localStorage['current_activity']).activity_status == 1;
    var isEnded = JSON.parse(localStorage['current_activity']).activity_status == 2;
    var isRightChar = (start_chars == 'bm' || start_chars == 'BM');
    var isNotRepeated = !Person.isRepeated(json_message);
    console.log('不重复:'+isNotRepeated);
    console.log('未开始：'+isNotStart);
    console.log('正在报名：'+isSigning);
    console.log('已结束：'+isEnded);
    console.log('正确的开头：'+isRightChar);


    //读出json_message中的数据
    var person_name = json_message.messages[0].message.slice(2);
    var phone_number = json_message.messages[0].phone;


    if (isStarted && isSigning && isRightChar && isNotRepeated){

        console.log('是否报名成功:'+(isStarted && isSigning && isRightChar && isNotRepeated))
        //组成数组元素person_item
        var person_item = {'name':person_name,'phone':phone_number};

        //读出当前活动名作为其报名列表的数组名
        var result = Person.read_person_item();

        var stored = JSON.parse(localStorage['current_activity']).nameof_activity;
        var result = JSON.parse(localStorage[stored]);

        result.push(person_item);

        localStorage[stored] = JSON.stringify(result);


        Page_Refresh();
        native_accessor.send_sms(phone_number,'恭喜！报名成功');

    }

    else if (!isStarted && isNotStart) {
        native_accessor.send_sms(phone_number,'活动尚未开始，请稍候……');
    }

    else if (!isStarted && isEnded) {
        native_accessor.send_sms(phone_number,'活动已经结束')
    }

    else if (!isNotRepeated) {

        native_accessor.send_sms(phone_number,'已经报名成功，请勿重复报名！')
    }

}


/**********************************************************************************************************************
 * description: 判断是否重复报名
 * @param json_message
 * @returns {boolean}
 */
Person.isRepeated = function(json_message) {

    var item_temp = Person.read_person_item();

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