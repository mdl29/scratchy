const roomEditor = {
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
    template: `
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
        `
};