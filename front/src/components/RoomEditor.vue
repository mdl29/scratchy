<template>
    <div class="room_editor_wrapper">
        <div class="room_editor_popup">
            <div class="room_editor_tabs">
                <div :class='{ room_editor_selected_tab: tab == "join_room" }' @click='tab = "join_room"'>join</div>
                <div :class='{ room_editor_selected_tab: tab == "create_room" }' @click='tab = "create_room"'>create</div>
            </div>
            <div class="room_editor_content_wrapper" v-if='tab == "join_room"'>
                <label class="room_editor_label" for="id">room id</label>
                <input name="id" class="room_editor_input" type="text" v-model="joinRoomId"/>
                <div class="room_editor_submit_wrapper">
                    <button class="room_editor_button room_editor_cancel" @click="close()">cancel</button>
                    <button class="room_editor_button room_editor_submit" @click="$emit('joinRoom', joinRoomId)">join</button>
                </div>
            </div>
            <div class="room_editor_content_wrapper" v-if='tab == "create_room"'>
                <label class="room_editor_label" for="room_title">room title</label>
                <input name="room_title" class="room_editor_input" v-model="createRoomTitle" />
                <label class="room_editor_label" for="room_desc">room description</label>
                <textarea name="room_desc" class="room_editor_input" v-model="createRoomDescription"></textarea>
                <div class="room_editor_submit_wrapper">
                    <button class="room_editor_button room_editor_cancel" @click="close()">cancel</button>
                    <button class="room_editor_button room_editor_submit" @click="$emit('createRoom', {title: createRoomTitle, description: createRoomDescription})">create</button>
                </div>
            </div>
        </div>    
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "room-editor",
    data: () => ({
        // can be
        // join_room
        // create_room
        tab: "join_room",
        createRoomTitle: "",
        createRoomDescription: "",
        joinRoomId: ""
    }),
    props: ["hidden"],
    emits: ["createRoom", "joinRoom", "update:hidden"],
    methods: {
        close() {
            this.$emit("update:hidden", true);
        }
    },
});
</script>

<style scoped>
.room_editor_wrapper {
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
}

.room_editor_popup {
    background-color: var(--bg3);
    border-radius: 7px;
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.room_editor_content_wrapper > *,
.room_editor_popup > *:not(.room_editor_content_wrapper) {
    --margin: 15px;

    margin-top: var(--margin);
    margin-bottom: var(--margin);
}

.room_editor_tabs {
    display: flex;
    width: 100%;
}

.room_editor_tabs > * {
    flex-grow: 1;
    text-align: center;
    cursor: pointer;
    padding-bottom: 8px;
}

.room_editor_selected_tab {
    border-bottom: solid white 2px;
}

.room_editor_content_wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.room_editor_title {
    width: 100%;
    text-align: center;
    font-size: smaller;
}

.room_editor_label {
    color: rgb(189, 189, 189);
    font-size: 0.8em;
    margin-bottom: 0;
}

.room_editor_input {
    margin-top: 3px;
    outline: 0;
    border: none;
    border-radius: 4px;
    padding: 5px;
    font-size: 0.9em;
    color: rgb(173, 173, 173);
    background-color: var(--bg2);
    transition: 0.1s;
    width: 30vw;
    min-width: 400px;
}

.room_editor_input:focus {
    color: white;
}

textarea.room_editor_input {
    resize: vertical;
}

.room_editor_submit_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
}

.room_editor_button {
    border: none;
    transition: 0.1s;
    border-radius: 4px;
    color: white;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 0.9em;
}

.room_editor_button:hover {
    filter: brightness(0.8);
}

.room_editor_submit {
    background-color: var(--accent);
}

.room_editor_cancel {
    background-color: rgb(145, 145, 145);
}
</style>
