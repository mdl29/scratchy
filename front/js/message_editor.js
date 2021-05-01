const messageEditor = {
    name: "message-editor",
    props: ["content"],
    methods: {
        onInput(e) {
            this.$emit("update:content", e.target.value);
        }
    },
    watch: {
        content(newContent, oldContent) {
            // when we got from 0 to 1+ length (to not trigger the event after each input and support copy paste)
            if(newContent.length > 0 && oldContent.length === 0) {
                this.$emit('startWriting');
            } else if(newContent.length === 0) {
                this.$emit('stopWriting');
            }
        }
    },
    emits: ["sendMessage", "startWriting", "stopWriting", "update:content"],
    template: `
    <div class='message_editor_wrapper'>
        <textarea v-bind:value="content" @input="onInput" class="message_editor_input"/>
        <button @click="$emit('sendMessage');" class="message_editor_button">
            <div class="message_editor_send_icon"></div>
        </button>
    </div>`
};