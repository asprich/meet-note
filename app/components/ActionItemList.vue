<template>
    <div class="d-flex flex-column">
        <v-flex py-4 style="position:relative">
            <label v-text="label"></label>
            <v-btn style="position:absolute;top:7px;right:0;z-index:1;" fab dark color="green" small @click="add">
                <v-icon dark>mdi-plus</v-icon>
            </v-btn>
        </v-flex>

        <v-flex v-for="item in items" :key="item.__key" class="pl-2">
            <v-row>
                <v-col sm="2">
                    <v-text-field v-model="item.assignee" @blur="updateData()" label="Assignee" prepend-icon="mdi-record"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field v-model="item.action" @blur="updateData()" label="Action"></v-text-field>
                </v-col>
                <v-col sm="3">
                    <time-stamp-date-picker v-model="item.dueDate" label="Due Date" @input="updateData()">
                        <v-icon slot="append-outer" color="red" @click="remove(item)">mdi-minus</v-icon>
                    </time-stamp-date-picker>
                </v-col>
            </v-row>
        </v-flex>
    </div>
</template>

<script>
import TimeStampDatePicker from "./TimeStampDatePicker";
import MeetingNoteFactory from "../helpers/MeetingNoteFactory";
import KeyGenerator from "../helpers/KeyGenerator";

export default {
    name:"ActionItemList",
    props: ["value","label"],
    components: {TimeStampDatePicker},
    data()  {
        return {
            items: []
        }
    },
    mounted() {
        this.items = this.valueToItems(this.value);
    },
    watch: {
        value(newItems) { this.items = this.valueToItems(newItems); }
    },
    methods: {
        add() {
            var item = MeetingNoteFactory.createActionItem();
            this.items.push(item);
        },
        remove(item) {
            console.log(item);
            for(var i=0;i<this.items.length;i++) {
                if (this.items[i].__key !== item.__key)
                    continue;
                
                this.items.splice(i, 1);
                break;
            }
        },
        valueToItems(val) {
            return (val||[]).map(t => { 
                t.__key = KeyGenerator.newRandomNumberKey();
                return t;
            });
        },
        updateData() {
            this.$emit('input', this.items);
        },
        
    }
};
</script>