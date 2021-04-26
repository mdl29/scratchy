const roomEditor = {
    name: "room-editor",
    data: () => ({
        isPopupShown: false,
        // 0 -> join room
        // 1 -> create room
        tab: 0,
        createRoomTitle: "",
        createRoomDescription: "",
        joinRoomId: ""
    }),
    props: ["closePopup"],
    methods: {
        close() {
            this.isPopupShown = false;
        },
        open() {
            this.isPopupShown = true;
        }
    },
    emits: ["createRoom", "joinRoom", "lockClose"],
    template: `
        <div class="room_editor_start" @click="open()">
            <div class="room_editor_plus"></div>
        </div>
        <div v-if="isPopupShown" class="room_editor_wrapper">
            <div class="room_editor_popup">
                <div class="room_editor_tabs">
                    <div :class="{ room_editor_selected_tab: tab == 0 }" @click="tab = 0">join</div>
                    <div :class="{ room_editor_selected_tab: tab == 1 }" @click="tab = 1">create</div>
                </div>
                <div class="room_editor_content_wrapper" v-if="tab == 0">
                    <label class="room_editor_label" for="id">room id</label>
                    <input name="id" class="room_editor_input" type="text" v-model="joinRoomId"/>
                    <div class="room_editor_submit_wrapper">
                        <button class="room_editor_button room_editor_cancel" @click="close()">cancel</button>
                        <button class="room_editor_button room_editor_submit" @click="$emit('joinRoom', joinRoomId)">join</button>
                    </div>
                </div>
                <div class="room_editor_content_wrapper" v-if="tab == 1">
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
        `,
    watch: {
        closePopup() {
            if(this.closePopup) {
                this.isPopupShown = false;
                this.$emit('lockClose');
            }
        }
    }
};