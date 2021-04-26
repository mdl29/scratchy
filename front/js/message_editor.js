const messageEditor = {
    name: "message-editor",
    data: () => ({
        content: "",
        // to know the writing start and end
        oldContent: ""
    }),
    props: ["clearMessage"],
    methods: {
        clear() {
            this.content = "";
            this.onInput();
        },
        onInput() {
            if(this.content.length > 0 && this.oldContent.length === 0) {
                this.$emit('startWriting');
            } else if(this.content.length === 0) {
                this.$emit('stopWriting');
            }
            this.oldContent = this.content;
        }
    },
    watch: {
        clearMessage() {
            if(this.clearMessage) {
                this.clear();
                this.$emit('lockClearMessage');
            }
        }
    },
    emits: ["sendMessage", "startWriting", "stopWriting", "lockClearMessage"],
    template: `
    <div class='message_editor_wrapper'>
    <textarea v-model="content" class="message_editor_input" @input="onInput()" />
    <button @click="$emit('sendMessage', content);" class="message_editor_button"><div class="message_editor_send_icon"></div></button>
    </div>`
};