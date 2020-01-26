<template>
    <v-card class="pa-10" v-if="model">
        <v-card-title>{{model.title}}</v-card-title>
        <v-card-subtitle>{{model.date.toDate().toDateString().replace(' 2020',', 2020')}}</v-card-subtitle>
        <v-card-text>
            <v-row no-gutters class="pb-5">
                <v-flex sm12 md2>Attendees:</v-flex>
                <v-flex sm12 md10>
                    <v-chip v-for="attendee in model.attendees" :key="attendee" class="mr-2">{{attendee}}</v-chip>
                </v-flex>
            </v-row>

            <v-row no-gutters class="pb-5">
                <v-flex sm12 md2>Tags:</v-flex>
                <v-flex sm12 md10>
                    <v-chip v-for="tag in model.tags" :key="tag">{{tag}}</v-chip>
                </v-flex>
            </v-row>
            
            <v-row no-gutters class="pb-5">
                <v-flex sm12 md2>Agenda:</v-flex>
                <v-flex sm12 md10>
                    <ul>
                        <li v-for="agendaItem in model.agenda" :key="agendaItem">{{agendaItem}}</li>
                    </ul>
                </v-flex>
            </v-row>

            <v-row no-gutters class="pb-5">
                <v-flex sm12 md2>Notes</v-flex>
                <v-flex sm12 md10 v-html="model.notes"></v-flex>
            </v-row>
            
            <v-row no-gutters class="pb-5">
                <v-flex sm12 md2>Decisions:</v-flex>
                <v-flex sm12 md10>
                    <ul>
                        <li v-for="decision in model.decisions" :key="decision">{{decision}}</li>
                    </ul>
                </v-flex>
            </v-row>
            
            <v-row no-gutters class="pb-5">
                <v-flex sm12 md2>Action Items:</v-flex>
                <v-flex sm12 md10>
                    <ul>
                        <li v-for="actionItem in model.actionItems" :key="actionItem.key">
                            <v-chip v-for="assignee in actionItem.assignee" :key="assignee">{{assignee}}</v-chip>:
                            <span>{{actionItem.action}}</span>
                        </li>
                    </ul>
                </v-flex>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import RichTextEditor from "../components/RichTextEditor";

export default {
    name: "NoteView",
    components: { RichTextEditor },
    data: () => ({
        model: null
    }),
    mounted() {
        this.$store
            .dispatch("get.meet-note", this.$route.params.meetingId)
            .then(i => this.model = i);
    }
};
</script>