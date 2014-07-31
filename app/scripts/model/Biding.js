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

