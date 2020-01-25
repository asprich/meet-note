<template>
    <v-combobox ref="cbox" 
        v-model="selectedItems" 
        :label="label" 
        multiple 
        chips 
        autocomplete
        :items="filteredAutoCompleteItems"
        deletable-chips
        :search-input.sync="seachInput" 
        @change="seachInput = ''" 
        @keydown="keyd"></v-combobox>
</template>

<script>
/********************************************************
 * This is for a combo box using chips with auto complete
 *   ::::4 problems I had::::
 *   #1: When I added the "auto-select-first" flag, which
 *       allows you to hit enter and it adds the first
 *       item that matches, it would add it but also add
 *       they text you had typed.
 *   #2: Also adding auto-select-first stopped allowing 
 *       you to add things that weren't in the list. So
 *       for instance, you would not be able to add a 
 *       new tag if it didn't already exist.
 *   #3: Upon fixing the issue above it caused the tab
 *       to jump you to the next field instead of letting
 *       you enter more tabs
 *   #4: Once a tag was entered it was not removed from 
 *       the auto-complete list. I think in most case you
 *       would want to avoid entering the same person or 
 *       tag twice.
 * 
 *  In short, this lets you:
 *      * Offer auto complete
 *      * Hit tab to auto-complete with the top match
 *        as a chip.
 *      * Hit enter to add the value you currently have 
 *        as a chip.
 *      * Removes auto-complete items you've already 
 *        entered.
 *******************************************************/
export default {
    name: "TextBoxList",
    props: ["value","label","autocompleteItems"],
    data: () => ({
        selectedItems: [],
        seachInput: null
    }),
    computed: {
        filteredAutoCompleteItems() {
            return (this.autocompleteItems||[]).filter(i => this.selectedItems.indexOf(i) === -1);
        }
    },
    watch: {
        value(newItems) { this.selectedItems = newItems; }
    },
    methods: {
        keyd(event) {
            if (event.key === "Tab") {
                if (!this.$refs.cbox.lazySearch) {
                    //Maintain tab to next input when 
                    //no text has been typed
                    return;
                }
                var fi = this.$refs.cbox.filteredItems;
                if (fi.length > 0) {
                    this.$refs.cbox.lazySearch = "";
                    this.$refs.cbox.selectedItems.push(fi[0]);
                    event.stopPropagation();
                    event.preventDefault();
                    var _this = this;
                    setTimeout(function() { _this.$refs.cbox.focus(); }, 100);
                }
            }
        },
        updateData() {
            this.$emit('input', this.selectedItems.map(i => i));
        }
    },
    mounted() {
        this.selectedItems = this.value;
    }
};
</script>