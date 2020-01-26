<template>
    <v-data-table class="elevation-1" 
        :items="decisions" item-key="key" :headers="headers">
            <template v-slot:item.date="{ item }">{{item.date.toDate().toDateString()}}</template>
            <template v-slot:item.meetingId="{ item }">
                <v-btn :to="{ name:'view', params:{ meetingId: item.meetingId }}" icon><v-icon>mdi-eye-outline</v-icon></v-btn>
            </template>
    </v-data-table>
</template>

<script>
export default {
    name: "DecisionList",
    data: () => ({
        headers: [
            { text: "Date", value: "date" },
            { text: "Decision", value: "decision"},
            { text: "Meeting", value: "meetingId"}
        ]
    }),
    computed: {
        decisions() {
            return this.$store.getters.decisions;
        }
    }
}
</script>