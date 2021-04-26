const activityBar = {
    name: "activity-bar",
    props: ["currentRoom", "isWriting"],
    template: `
    <div class='activity_bar'>
        <div class='activity_bar_room'>{{currentRoom}}</div>
        <div v-if="isWriting" class='activity_bar_writing'> writing... </div>
    </div>`
};