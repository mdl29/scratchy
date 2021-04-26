const roomList = {
    name: "room-list",
    props: ["rooms"],
    emits: ["roomSelected", "roomQuit"],
    template: `
    <div class='room_list_wrapper'>
        <template v-for="(room, index) in rooms" :key="room._id.$oid">
            <div class="room_list_item">
                <div class="room_list_room" @click="$emit('roomSelected', index)"> {{room.title}} </div>
                <div class="room_list_quit" @click="$emit('roomQuit', index)"><div></div></div>
            </div>
        </template>
    </div>`
};