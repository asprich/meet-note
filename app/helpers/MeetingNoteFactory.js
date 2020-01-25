import fb from "./Firebase";
import keyGenerator from "./KeyGenerator";

export default {
    createMeetingNote() {
        return {
            id: keyGenerator.new(),
            title: null,
            date: fb.now(),
            attendees: [],
            tags: [],
            agenda: [],
            notes: "",
            decisions: [],
            actionItems: []
        }
    },

    createActionItem(meetingId) {
        return {
            assignee: null,
            action: null,
            createDate: fb.now(),
            dueDate: fb.now()
        }
    }
}