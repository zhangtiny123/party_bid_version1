/**
 * Created by tiny on 14-7-25.
 */
function Page_Refresh() {
    var refresh_page = document.getElementById("sign_wrapper");
    if (refresh_page) {
        var scope = angular.element(refresh_page).scope();
        scope.$apply(function () {
            var during_name= JSON.parse(localStorage['current_activity']).nameof_activity;
            var result=JSON.parse(localStorage[during_name]);
            result = result.reverse();



            scope.persons= result;
            console.log(result.length);
            scope.num_of_sign=result.length;

            console.log(scope.num_of_sign);

            console.log('refresh_function_run!');
        })
    }
}