import Vue from "vue";
import VueRouter from "vue-router";

//Components
import LatestMeetingsList from "../pages/LatestMeetingsList";
import EditMeetingNote from "../pages/EditMeetingNote";
import ViewMeetingNote from "../pages/ViewMeetingNote";
import ActionItems from "../pages/ActionItems";
import DecisionList from "../pages/DecisionList";

//This is used to trick VueRouter into reload the edit component when 
//you try to create a new entry. 
//VueRouter is trying to be smart and not reload the same component. 
//The problem we need this to happen in this case.
const NewMeetingNote = Vue.extend({...EditMeetingNote,name: "NewNote"});

export default new VueRouter({
    mode: "history",
    routes: [
        { name:"new", path: "/meeting-note/new", component: NewMeetingNote },
        { name:"edit", path: "/meeting-note/edit/:meetingId", component: EditMeetingNote },
        { name:"view", path: "/meeting-note/view/:meetingId", component: ViewMeetingNote },
        { name:"action-items", path: "/action-items", component: ActionItems },
        { name:"decisions", path: "/decisions", component: DecisionList },
        { name:"home", path: "/", component: LatestMeetingsList }
    ]
});