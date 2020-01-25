import Vue from "vue";
import Vuex from "vuex";

import { vuexfireMutations, firestoreAction } from "vuexfire";
import fb from "../helpers/Firebase";

const db = fb.firestore;

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        latestMeetingNotes: [],
        autoCompleteLists: [],
        actionItems: [],
        user: {}
    },
    getters: {
        tags: state => {
            return (state.autoCompleteLists.length > 1 && state.autoCompleteLists[1].tags)
                ? state.autoCompleteLists[1].tags
                : [];
        },
        people: state => {
            return (state.autoCompleteLists.length > 0 && state.autoCompleteLists[1].tags)
                ? state.autoCompleteLists[0].people
                : [];
        },
        actionItems: state => {
            return [].concat.apply([],state.actionItems.map(i => i.actionItems.map((m,x) =>{
                m.meetingId = i.id;
                m.__key = m.meetingId+"-"+x;
                m.hasBeenCompleted = false;
                return m;
            })));
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        ...vuexfireMutations
    },

    actions: {
        "watch.meet-note": firestoreAction(context => 
            context.bindFirestoreRef("latestMeetingNotes", db.collection("meet-note").orderBy("date","desc"))),
        
        "watch.auto-complete-lists": firestoreAction(context => 
            context.bindFirestoreRef("autoCompleteLists", db.collection("auto-complete-lists"))),
        
        "watch.meet-note-action-items": firestoreAction(context => 
            context.bindFirestoreRef("actionItems", db.collection("meet-note-action-items")))
    }
})

//Start these watchers
store.dispatch("watch.meet-note");
store.dispatch("watch.auto-complete-lists");
store.dispatch("watch.meet-note-action-items");

export default store;