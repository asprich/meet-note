<template>
    <div class="d-flex flex-column">
        <label v-text="label"></label>
        <div :id="quillId"></div>
    </div>
</template>

<script>
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
//import "quill/dist/quill.bubble.css";

export default {
    name: "RichTextEditor",
    props: ["value","label"],
    data: () => ({
        quillId: "editor_" + Math.floor(Math.random()*100000000),
        content: "",
        quill: null
    }),
    watch: {
        value(newValue) { this.quill.root.innerHTML = this.value }
    },
    mounted() {
        this.content = this.value;

        global.quill = this.quill = new Quill("#" + this.quillId, {
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['link', 'blockquote', 'code-block', 'image'],
                    [{ list: 'ordered' }, { list: 'bullet' }]
                ]
            },
            placeholder: 'Compose an epic...',
            theme: "snow"
        });
        
        this.quill.root.innerHTML = this.content;

        this.quill.root.addEventListener("blur", () => this.$emit('input', this.content = this.quill.root.innerHTML));
    }
}
</script>

<style>
.v-application .ql-container,
.v-application .ql-container p
    { font-size: 18px; }
</style>