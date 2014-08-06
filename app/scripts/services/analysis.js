/**
 * Created by tiny on 14-8-6.
 */
var analyze_bid_data = function(bid_name) {
    var bid_data = sort_by_price(bid_name);
    var right_price = find_successful_bid_price(bid_data);
    return _.find(bid_data,function(obj){return obj.price==right_price})
}

var sort_by_price = function(bid_name) {
    var bid_data = Biding.get_bid_person_list(bid_name);

    for (var i=0; i<bid_data.length-1; i++){
        for (var j=i+1; j<bid_data.length; j++) {
            if (bid_data[i].price > bid_data[j].price){
                var temp1 = bid_data[i].name;
                var temp2 = bid_data[i].phone;
                var temp3 = bid_data[i].price;

                bid_data[i].name = bid_data[j].name;
                bid_data[i].phone = bid_data[j].phone;
                bid_data[i].price = bid_data[j].price;

                bid_data[j].name = temp1;
                bid_data[j].phone = temp2;
                bid_data[j].price = temp3;
            }
        }
    }
    return bid_data;
}

var find_successful_bid_price =function(sorted_bid_data) {
    var successful_bid_price = bid_data[0].price;
    var flag = 0;
    var failure_flag = 0;
    for (var i=1; i<bid_data.length; i++){
        if(bid_data[flag] == bid_data[i].price){
            flag = flag + 1;
            failure_flag =1;
        }
        else{
            if(failure_flag == 1){
                successful_bid_price = bid_data[i].price;
                flag = flag + 1;
                failure_flag = 0;
            }
            else{
                return successful_bid_price;
            }
        }
        return null;
    }
}

