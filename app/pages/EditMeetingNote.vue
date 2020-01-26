<template>
    <v-card class="pa-10" v-if="model">
        <v-progress-linear v-if="waiting" indeterminate color="green"></v-progress-linear>
        <v-card-title>Meeting Notes</v-card-title>
        <v-form>
            <v-text-field v-model="model.title" label="Title"></v-text-field>
            <better-combobox v-model="model.attendees" label="Attendees" :autocomplete-items="people"></better-combobox>
            <better-combobox v-model="model.tags" label="Tags" :autocomplete-items="tags"></better-combobox>
            <text-box-list v-model="model.agenda" label="Agenda"></text-box-list>
            <rich-text-editor v-model="model.notes" label="Notes"></rich-text-editor>
            <text-box-list v-model="model.decisions" label="Decisions"></text-box-list>
            <action-item-list v-model="model.actionItems" label="Action Items"></action-item-list>
            <v-btn color="green" dark @click="save">Save</v-btn>
        </v-form>
        <v-snackbar v-model="successMessage" top color="success">
            Your save was successful!
            <v-btn dark text @click="successMessage = false">Close</v-btn>
        </v-snackbar>
    </v-card>
</template>

<script>
import TextBoxList from "../components/TextBoxList";
import ActionItemList from "../components/ActionItemList";
import RichTextEditor from "../components/RichTextEditor";
import BetterCombobox from "../components/BetterAutoCompleteComboBox";

export default {
    name: "NoteEdit",
    components: { TextBoxList, ActionItemList, RichTextEditor, BetterCombobox},
    data: () => ({
        model: null,
        attendeesInput: null,
        tagsInput: null,
        waiting: false,
        successMessage: false
    }),
    computed: {
        people() { return this.$store.getters.people },
        tags() { return this.$store.getters.tags; }
    },
    methods: {
        save() {
            this.waiting = true;
            this.$store
                .dispatch("save.meet-note", this.model)
                .then(i => {
                    this.waiting = false;
                    this.successMessage = true;
                });
        }
    },
    mounted() {
        this.$store
            .dispatch("get.meet-note", this.$route.params.meetingId)
            .then(i => this.model = i);
    }
};
</script>