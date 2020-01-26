<template>
    <v-data-table class="elevation-1" 
        :items="actionItems" item-key="__key" :headers="headers">
            <template v-slot:item="{ item }">
                <tr>
                    <td><v-checkbox v-model="item.hasBeenCompleted" color="green" @change="updateAction(item)"></v-checkbox></td>
                    <td><v-chip v-for="assignee in item.assignee" :key="assignee" dark class="mr-2">{{ assignee }}</v-chip></td>
                    <td><div :class="{strikethrough: item.hasBeenCompleted}">{{item.action}}</div></td>
                    <td>
                        <div v-if="!item.hasBeenCompleted">{{item.dueDate.toDate().toDateString().replace(' 2020',', 2020')}}</div>
                        <div v-if="item.hasBeenCompleted">Completed On: {{item.completedDate.toDate().toDateString().replace(' 2020',', 2020')}}</div>
                    </td>
                    <td>
                        <v-btn :to="{ name:'view', params:{ meetingId: item.meetingId }}" icon><v-icon>mdi-eye-outline</v-icon></v-btn>
                        <v-btn :to="{ name:'edit', params:{ meetingId: item.meetingId }}" icon><v-icon>mdi-pencil</v-icon></v-btn>
                    </td>
                </tr>
            </template>
    </v-data-table>
</template>

<script>
export default {
    name: "ActionItems",
    data: () => ({
        headers: [
            { text: "Complete", value: "complete" },
            { text: "Assignee", value: "assignee" },
            { text: "Action", value: "action" },
            { text: "Due Date", value: "dueDate"},
            { text: "Meeting", value: "meetingId"}
        ]
    }),
    computed: {
        actionItems() {
            return this.$store.getters.actionItems;
        }
    },
    methods: {
        updateAction(actionItem) {
            this.$store.dispatch("complete.meet-note-action-item", actionItem)
                .then(console.log);
        }
    }
}
</script>

<style>
.strikethrough { text-decoration: line-through; }
</style>