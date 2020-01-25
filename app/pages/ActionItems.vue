<template>
    <v-data-table class="elevation-1 stretch" 
        :items="actionItems" item-key="__key" :headers="headers">
            <template v-slot:item="{ item }">
                <tr>
                    <td><v-checkbox v-model="item.hasBeenCompleted" color="green"></v-checkbox></td>
                    <td>{{item.assignee}}</td>
                    <td><div :class="{strikethrough: item.hasBeenCompleted}">{{item.action}}</div></td>
                    <td>{{item.dueDate.toDate().toDateString().replace(' 2020',', 2020')}}</td>
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
    }
}
</script>

<style>
.strikethrough { text-decoration: line-through; }
</style>