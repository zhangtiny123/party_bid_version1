//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"bm仝键","phone":"18733171780"}]})
//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"jj308","phone":"18733171780"}]})


var native_accessor = {
    send_sms: function (phone, message) {
//        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});

        console.log('phone:'+phone);
        console.log('message:'+message);

    },

    receive_message: function (json_message) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(json_message);
        }
    },

    process_received_message: function (json_message) {
        var start_chars = json_message.messages[0].message.slice(0,2);
        console.log('首字符'+start_chars);
        var isSignUp = (start_chars=='bm' || start_chars=='BM' || start_chars=='Bm' || start_chars=='bM');
        console.log('正确的开头：'+isRightChar);
        var isBiding = (start_chars=='jj' || start_chars=='JJ' || start_chars=='jJ' || start_chars=='Jj');
        if (isSignUp){
            Person.save(json_message);
        }

        else if (isBiding) {
            
        }
        else {
            native_accessor.send_sms(phone_number,'短信格式不正确！');
        }


    }

};



function notify_message_received(message_json) {

    //console.log(JSON.stringify(message_json));
    //JSON.stringify(message_json);
    //alert(JSON.stringify(message_json.messages));



    native_accessor.receive_message(message_json);



    //phone_number=message_json.messages[0].phone;
}

