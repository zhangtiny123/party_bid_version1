/**
 * Created by tiny on 14-7-16.
 */
function activity(name,descriptions){
    this.activity_name=name;
    this.activity_descriptions=descriptions;
}

activity.get_activities = function () {
    return JSON.parse(localStorage.getItem("activities")) || [];
}

activity.prototype.have_activities = function () {
    return (activity.get_activities() != null);
}

