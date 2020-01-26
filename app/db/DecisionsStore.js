import { firestoreAction } from "vuexfire";
import fb from "../helpers/Firebase";
const db = fb.firestore;

export default {
    state: {
        decisions: []
    },
    getters: {
        decisions: state => {
            return [].concat.apply([],state.decisions.map(i => i.decisions.map(m => {
                var x = {};
                x.meetingId = i.id;
                x.decision = m
                x.date = i.date;
                return x;
            })));
        }
    },
    actions: {
        "watch.meet-note-details": firestoreAction(context => 
            context.bindFirestoreRef("decisions", db.collection("meet-note-details").orderBy("date","desc")))
    }
}