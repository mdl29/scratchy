const activityBar = {
    name: "activity-bar",
    props: ["currentRoom", "isWriting"],
    data: () => ({
        popup: false,
    }),
    methods: {
        copy(){
            let input = document.querySelector('.room_id_input');
            input.focus();
            input.select();
            document.execCommand('copy');
            
        }
    },
    template: `
    <div class='activity_bar'>
    <template v-if="currentRoom !== null">
        <div class='activity_bar_room'>
            {{currentRoom.title}}    
        </div>
        <button v-on:click="popup = true" class="button_popup"><img src="icons/share-icon-white.svg" id="popup_icon"></button>
        <div v-if="isWriting" class='activity_bar_writing'> writing... </div>
        <div class="share_popup_background" v-if="popup">
            <div class="share_popup">
                <div class="share_title">Share room id</div>
                <div class="room_id">
                    <label class="share_label"> room id: &nbsp;</label>
                    <input class="room_id_input" :value="currentRoom.id" readonly ></input>
                </div>
                <div class="copy_wrapper">
                    <button class="copy_button gradient" @click="copy"> Copy ! </button>
                </div>
                <div class="share_submit_wrapper">
                    <button class="share_submit" v-on:click="popup = false">close</button>
                </div>
            </div>
        </div>

    </template>
    <!-- to keep the activity bar rendering correctly even when no room is provided -->
    &nbsp;
    </div>`
};