<template>
<div class='message_editor_wrapper'>
    <textarea v-bind:value="content" @input="onInput" class="message_editor_input"/>
    <button @click="$emit('sendMessage');" class="message_editor_button">
        <div class="message_editor_send_icon"></div>
    </button>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "message-editor",
    props: ["content"],
    methods: {
        onInput(e: Event) {
            this.$emit("update:content", (e.target as HTMLTextAreaElement).value);
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
});
</script>

<style scoped>
.message_editor_input {
    background-color: var(--bg2);
    outline: 0;
    border: none;
    padding: 10px;
    border-radius: var(--border-radius);
    font-size: calc(var(--font-size) - 5px);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: var(--dark-text);
    transition: all 0.2s;
    height: calc(var(--font-size) * 2);
    resize: none;
    flex-grow: 2;
}

.message_editor_input::-webkit-scrollbar-track {
    background: var(--bg2);
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    overflow: hidden;
}

.message_editor_input::-webkit-scrollbar {
    width: 10px;
}

.message_editor_input::-webkit-scrollbar-thumb {
    background: var(--bg3);
    border-radius: var(--border-radius);
}

.message_editor_input:focus {
    color: var(--font-text);
}

.message_editor_button {
    background-color: var(--accent);
    border: none;
    font-size: var(--font-size);
    display: flex;

    --size: calc(var(--font-size) * 2);

    width: var(--size);
    height: var(--size);
    border-radius: var(--border-radius);
    margin: 0;
    outline: 0;
    margin-left: 5px;
    transition: all 0.1s;
    font-weight: lighter;
}

.message_editor_button:hover {
    cursor: pointer;
    filter: brightness(0.8);
}

.message_editor_send_icon {
    background-color: var(--font-text);
    clip-path: polygon(20% 47%, 12% 20%, 90% 50%, 12% 80%, 20% 53%, 50% 50%);
    width: 100%;
    height: 100%;
}

.message_editor_wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
}
</style>
