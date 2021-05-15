const activityBar = {
    name: "activity-bar",
    props: ["currentRoom", "isWriting"],
    template: `
    <div class='activity_bar'>
    <template v-if="currentRoom !== null">
        <div class='activity_bar_room'>{{currentRoom.title}}</div>
        <div v-if="isWriting" class='activity_bar_writing'> writing... </div>
    </template>
    <!-- to keep the activity bar rendering correctly even when no room is provided -->
    &nbsp;
    </div>`
};