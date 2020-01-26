import { firestoreAction } from "vuexfire";
import fb from "../helpers/Firebase";
const db = fb.firestore;

export default {
    state: {
        actionItems: []
    },
    getters: {
        actionItems: state => {
            return [].concat.apply([],state.actionItems.map(i => i.actionItems.map((m,x) =>{
                m.meetingId = i.id;
                return m;
            })));
        }
    },
    actions: {
        "watch.meet-note-action-items": firestoreAction(context => 
            context.bindFirestoreRef("actionItems", db.collection("meet-note-action-items"))),

        "complete.meet-note-action-item": function({commit,state}, actionItem) {
            var meetingId = actionItem.meetingId;

            return db.collection("meet-note-action-items")
                .doc(meetingId).get()
                .then(function(doc) {
                    var data = doc.data();

                    data.actionItems.forEach(item => {
                        if (item.key != actionItem.key)
                            return;
                        
                        item.hasBeenCompleted = actionItem.hasBeenCompleted;
                        item.completedDate = actionItem.hasBeenCompleted
                            ? fb.firebase.firestore.Timestamp.fromDate(new Date())
                            : null;
                    });
                    
                    return db.collection("meet-note-action-items").doc(meetingId).set(data);
                })
        }
    }
}