import fb from "../helpers/Firebase";
import MeetingNoteFactory from "../helpers/MeetingNoteFactory";

export default class MeetingNoteRepository {
    constructor(db) {
        //Dependencies
        this._db = db || fb.firestore;
    }

    get(meetingId, callback) {
        var m = MeetingNoteFactory.createMeetingNote();

        Promise.all([
            this._db.collection("meet-note").doc(meetingId).get(),
            this._db.collection("meet-note-details").doc(meetingId).get(),
            this._db.collection("meet-note-action-items").doc(meetingId).get()
        ]).then(function(values) {
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

            callback(m);
        });
    }

    save(meetingNote, callback) {
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
            decisions: meetingNote.decisions
        }

        var actionItems = {
            actionItems: meetingNote.actionItems.map(i => ({
                action: i.action,
                assignee: i.assignee,
                createDate: i.createDate,
                dueDate: i.dueDate
            }))
        };

        var batch = this._db.batch();
        var meetNoteRef = this._db.collection("meet-note").doc(docId);
        batch.set(meetNoteRef, meetNote);

        var meetNoteDetailsRef = this._db.collection("meet-note-details").doc(docId);
        batch.set(meetNoteDetailsRef, meetNoteDetails);

        var meetNoteActionItemsRef = this._db.collection("meet-note-action-items").doc(docId);
        batch.set(meetNoteActionItemsRef, actionItems);

        batch.commit().then(callback);
    }
}