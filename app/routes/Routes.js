import VueRouter from "vue-router";

//Components
import LatestMeetingsList from "../pages/LatestMeetingsList";
import EditMeetingNote from "../pages/EditMeetingNote";
import ActionItems from "../pages/ActionItems";

export default new VueRouter({
    mode: "history",
    routes: [
        { name:"new", path: "/meeting-note/edit", component: EditMeetingNote },
        { name:"edit", path: "/meeting-note/edit/:meetingId", component: EditMeetingNote },
        { name:"action-items", path: "/action-items", component: ActionItems },
        { name:"home", path: "/", component: LatestMeetingsList }
    ]
});