import { firestoreAction } from "vuexfire";
import fb from "../helpers/Firebase";

import MeetingNoteFactory from "../helpers/MeetingNoteFactory";

const db = fb.firestore;

export default {
    state: {
        latestMeetingNotes: [],
        autoCompleteLists: []
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
        }
    },
    actions: {
        "watch.meet-note": firestoreAction(context => 
            context.bindFirestoreRef("latestMeetingNotes", db.collection("meet-note").orderBy("date","desc"))),
        
        "watch.auto-complete-lists": firestoreAction(context => 
            context.bindFirestoreRef("autoCompleteLists", db.collection("auto-complete-lists"))),
        
        "get.meet-note": function({ commit, state}, meetingId) {    
            if (!meetingId)
                return Promise.resolve(MeetingNoteFactory.createMeetingNote());

            return Promise.all([
                db.collection("meet-note").doc(meetingId).get(),
                db.collection("meet-note-details").doc(meetingId).get(),
                db.collection("meet-note-action-items").doc(meetingId).get()
            ]).then(function(values) {
                var m = MeetingNoteFactory.createMeetingNote();

                if (values[0].exists) {
                    var nd = values[0].data();
                    m.id = meetingId;
                    m.title = nd.title;
                    m.date = nd.date;
                    m.attendees = nd.attendees;
                    m.tags = nd.tags;
                }

                if (values[1].exists) {
                    var dd = values[1].data();
                    m.id = meetingId;
                    m.agenda = dd.agenda;
                    m.notes = dd.notes;
                    m.decisions = dd.decisions;
                }
                
                if (values[2].exists) {
                    var ad = values[2].data();
                    m.id = meetingId;
                    m.actionItems = ad.actionItems;
                }
                
                return m;
            });
        },

        "save.meet-note": function({commit, state}, meetingNote) {
            var docId = meetingNote.id;
    
            var meetNote = {
                title: meetingNote.title,
                date: meetingNote.date,
                attendees: meetingNote.attendees,
                tags: meetingNote.tags
            };
    
            var meetNoteDetails = {
                agenda: meetingNote.agenda,
                notes: meetingNote.notes,
                decisions: meetingNote.decisions,
                date: meetingNote.date
            }
    
            var actionItems = {
                actionItems: meetingNote.actionItems.map(i => {
                    var item =  {
                        key: i.key,
                        action: i.action,
                        assignee: i.assignee,
                        createDate: i.createDate,
                        dueDate: i.dueDate,
                        completedDate: i.completedDate,
                        hasBeenCompleted: i.hasBeenCompleted
                    };

                    if (item.hasBeenCompleted && !item.completedDate)
                        item.completedDate = fb.firebase.firestore.Timestamp.fromDate(new Date());
                    if (!item.hasBeenCompleted && item.completedDate)
                        item.completedDate = null;

                    return item;
                })
            };
    
            var batch = db.batch();
            var meetNoteRef = db.collection("meet-note").doc(docId);
            batch.set(meetNoteRef, meetNote);
    
            var meetNoteDetailsRef = db.collection("meet-note-details").doc(docId);
            batch.set(meetNoteDetailsRef, meetNoteDetails);
    
            var meetNoteActionItemsRef = db.collection("meet-note-action-items").doc(docId);
            batch.set(meetNoteActionItemsRef, actionItems);
    
            return batch.commit();
        }
    }
}