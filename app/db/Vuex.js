import Vue from "vue";
import Vuex from "vuex";

import UserStore from "./UserStore";
import MeetingNotesStore from "./MeetingNotesStore";
import ActionItemsStore from "./ActionItemsStore";
import DecisionsStore from "./DecisionsStore";

import { vuexfireMutations } from "vuexfire";

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        ...UserStore.state,
        ...MeetingNotesStore.state,
        ...ActionItemsStore.state,
        ...DecisionsStore.state
    },
    getters: {
        ...MeetingNotesStore.getters,
        ...ActionItemsStore.getters,
        ...DecisionsStore.getters
    },
    mutations: {
        ...UserStore.mutations,
        ...vuexfireMutations
    },
    actions: {
        ...MeetingNotesStore.actions,
        ...ActionItemsStore.actions,
        ...DecisionsStore.actions
    }
})

//Start these watchers
store.dispatch("watch.meet-note");
store.dispatch("watch.auto-complete-lists");
store.dispatch("watch.meet-note-action-items");
store.dispatch("watch.meet-note-details");

export default store;