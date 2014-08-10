/**
 * Created by tiny on 14-8-6.
 */


var analysis_of_biding = {
    analyze_bid_data : function(bid_name) {
        var bid_data = Biding.get_bid_person_list(bid_name);
        var result = _.sortBy(bid_data,function(bid){return bid.price});
        var result1=_.groupBy(result,function(temp){return temp.price});
       var result2 = _.find(result1,function(value,key){return value.length==1});
        return result2;
    },
    sort_by_price : function(bid_name) {
        var bid_data = Biding.get_bid_person_list(bid_name);
        return _.sortBy(bid_data,function(bid){
            return bid.price});
    },

    make_price_statistic : function(bid_name) {
        var bid_data = Biding.get_bid_person_list(bid_name);
        var group =  _.groupBy(_.sortBy(bid_data,function(bid){
            return bid.price}),function(bid_item){
            return bid_item.price})

        return _.map(group,function(value,key){
            return  {'price':key,'count':value.length}
        })
    }

}



