const activityBar = {
    name: "activity-bar",
    props: ["currentRoom", "isWriting"],
    data: () => ({
        popup: false
    }),
    template: `
    <div class='activity_bar'>
    <template v-if="currentRoom !== null">
        <div class='activity_bar_room'>{{currentRoom.title}} 
            <button v-on:click="popup = true" class="button_popup"><img src="icons/share-icon-white.svg" id="popup_icon"></button>
        </div>
        <div v-if="isWriting" class='activity_bar_writing'> writing... </div>
            <div class="share_popup" v-show="popup">
                <div class="share_title">Share room id</div>
                <label class="share_label"> room id : {{currentRoom._id.$oid}}</label> <!-- replace "currentRoom._id.$oid" by currentRoom._id when 151 will be merge -->
                <div class="share_submit_wrapper">
                <button class="share_submit" v-on:click="popup = false">close</button>
                </div>
            </div>

    </template>
    <!-- to keep the activity bar rendering correctly even when no room is provided -->
    &nbsp;
    </div>`
};