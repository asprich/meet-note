<template>
    <div class="d-flex flex-column">
        <v-flex py-4 style="position:relative">
            <label v-text="label"></label>
            <v-btn style="position:absolute;top:7px;right:0;z-index:1;" fab dark color="green" small @click="add">
                <v-icon dark>mdi-plus</v-icon>
            </v-btn>
        </v-flex>

        <v-flex v-for="item in items" :key="item.key" class="pl-2">
            <v-text-field v-model="item.text" @blur="updateData()" prepend-icon="mdi-record">
                <v-icon slot="append-outer" color="red" @click="remove(item)">mdi-minus</v-icon>
            </v-text-field>
        </v-flex>
    </div>
</template>

<script>
import KeyGenerator from "../helpers/KeyGenerator";

export default {
    name: "TextBoxList",
    props: ["value","label"],
    data()  {
        return {
            items: []
        }
    },
    mounted() {
        this.items = this.getItems(this.value);
    },
    watch: {
        value(newItems) { this.items = this.getItems(newItems); }
    },
    methods: {
        add() {
            this.items.push(this.wrap(""));
        },
        remove(item) {
            for(var i=0;i<this.items.length;i++) {
                if (this.items[i].key !== item.key)
                    continue;
                
                this.items.splice(i, 1);
                break;
            }
        },
        getItems(value) {
            return (value||[]).map(this.wrap);
        },
        updateData() {
            this.$emit('input', this.items.map(i => i.text));
        },
        wrap(stringValue) {
            return {
                key: KeyGenerator.newRandomNumberKey(),
                text: stringValue
            };
        }
    }
};
</script>