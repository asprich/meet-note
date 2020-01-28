<template>
    <v-row>
        <v-data-table class="elevation-1 stretch" 
            :headers="headers" :options.sync="pagination"
            :items="latestMeetingNotes" item-key="id"            
            :loading="loading" :search="search">
            <template v-slot:item.date="{ item }">{{item.date.toDate().toDateString()}}</template>
            
            <template v-slot:item.tags="{ item }">
                <v-chip v-for="tag in item.tags" :key="tag" dark class="mr-2">{{ tag }}</v-chip>
            </template>
            
            <template v-slot:item.attendees="{ item }">
                <v-chip v-for="attendee in item.attendees" :key="attendee" dark class="mr-2">{{ attendee }}</v-chip>
            </template>
            
            <template v-slot:item.action="{ item }">
                <v-btn :to="{ name:'view', params:{ meetingId: item.id }}" icon><v-icon>mdi-eye-outline</v-icon></v-btn>
                <v-btn :to="{ name:'edit', params:{ meetingId: item.id }}" icon><v-icon>mdi-pencil</v-icon></v-btn>
            </template>
        </v-data-table>
    </v-row>
</template>

<script>
export default {
    name: "LatestMettingsList",
    data: () => ({
        headers: [
            { text:"Title", value:"title" },
            { text:"Date", value:"date" },
            { text:"Tags", value:"tags" },
            { text:"Attendees", value:"attendees" },
            { text:"Actions", value:"action" }
        ],
        pagination: {},
        loading: false,
        search: null
    }),
    computed: {
        latestMeetingNotes() { return this.$store.state.latestMeetingNotes; }
    }
}
</script>