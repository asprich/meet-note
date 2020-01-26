<style>
.match-combo-box input[type='text'] { padding: 21px 0; }
.match-combo-box .v-input__prepend-outer { top: 5px; position: relative; }
</style>

<template>
    <div class="d-flex flex-column">
        <v-flex py-4 style="position:relative">
            <label v-text="label"></label>
            <v-btn style="position:absolute;top:7px;right:0;z-index:1;" fab dark color="green" small @click="add">
                <v-icon dark>mdi-plus</v-icon>
            </v-btn>
        </v-flex>

        <v-flex v-for="item in items" :key="item.key" class="pl-2">
            <v-row>
                <v-col sm="1">
                    <v-checkbox v-model="item.hasBeenCompleted" @input="updateData()"></v-checkbox>
                </v-col>
                <v-col sm="4">
                    <better-combobox v-model="item.assignee" label="Assigned To" :disabled="item.hasBeenCompleted" :autocomplete-items="people" @input="updateData()"></better-combobox>
                </v-col>
                <v-col class="match-combo-box">
                    <v-text-field v-model="item.action" @blur="updateData()" :disabled="item.hasBeenCompleted" label="Action"></v-text-field>
                </v-col>
                <v-col sm="2" class="match-combo-box">
                    <time-stamp-date-picker v-model="item.dueDate" label="Due Date" :disabled="item.hasBeenCompleted" @input="updateData()">
                        <v-icon slot="append-outer" color="red" @click="remove(item)" v-if="!item.hasBeenCompleted">mdi-minus</v-icon>
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
import BetterCombobox from "./BetterAutoCompleteComboBox";

export default {
    name:"ActionItemList",
    props: ["value","label"],
    components: {TimeStampDatePicker,BetterCombobox},
    data: () => ({
        items: []
    }),
    computed: {
        people() { return this.$store.getters.people }
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
                if (this.items[i].key !== item.key)
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
        
    },
    mounted() {
        this.items = this.valueToItems(this.value);
    }
};
</script>
