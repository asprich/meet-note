<template>
    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40"
    transition="scale-transition" offset-y min-width="290px">
        <template v-slot:activator="{ on }">
            <v-text-field v-model="selectedDate" :label="label" prepend-icon="mdi-calendar-month" readonly v-on="on" :disabled="disabled">
                <slot name="append-outer" slot="append-outer"></slot>
            </v-text-field>
        </template>
        <v-date-picker v-model="selectedDate" @input="menu = false"></v-date-picker>
    </v-menu>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/firestore";

export default {
    name:"TimeStampDatePicker",
    props: {
        value: Object,
        label: String,
        disabled: Boolean
    },
    data() {
        return {
            selectedDate: this.getDateFromTimeStamp(this.value),
            menu: false
        };
    },
    watch: {
        selectedDate() {
            this.$emit('input', this.getTimeStampFromDate(this.selectedDate));
        }
    },
    methods: {
        getTimeStampFromDate: function(date) {
            if (typeof(date) === "string")
                date = new Date(Date.parse(date));
            var d = date || new Date();
            var ts = firebase.firestore.Timestamp.fromDate(d);
            console.log([d,ts]);
            return ts;
        },
        getDateFromTimeStamp: function(timestamp) { 
            var d = timestamp && timestamp.toDate
                ? timestamp.toDate() 
                : new Date();
            var dString = d.toISOString().substr(0, 10);
            console.log([d, dString]);
            return dString;
        }
    }
};
</script>