<template>
<div class='room_list_wrapper'>
    <template v-for="(room) in rooms" :key="room.id">
        <div class="room_list_item">
            <div class="room_list_room" @click="$emit('roomSelected', room)"> {{room.title}} </div>
            <div class="room_list_quit" @click="$emit('roomQuit', room)"><div></div></div>
        </div>
    </template>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "room-list",
    props: ["rooms"],
    emits: ["roomSelected", "roomQuit"],
});
</script>

<style scoped>
.room_list_wrapper {
    display: flex;
    flex-direction: column;
    background-color: var(--bg3);
    padding: 10px 0 10px 0;
    width: 130px;
    overflow-y: auto;
    overflow-x: hidden;
}

.room_list_item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.room_list_room {
    margin: 3px;
    padding: 5px;
    margin-left: 0;
    color: rgb(146, 146, 146);
    transition: all 0.1s;
    cursor: pointer;
    border-radius: 4px;
    max-width: 100px;
}

.room_list_quit > div {
    background-color: var(--room_list_quit);
    clip-path: polygon(5% 0, 0 5%, 45% 50%, 0 95%, 5% 100%, 50% 55%, 95% 100%, 100% 95%, 55% 50%, 100% 5%, 95% 0, 50% 45%);
    height: 20px;
    width: 20px;
    transition: all 0.1s;
}

.room_list_quit {
    transition: all 0.1s;
    overflow: hidden;
    cursor: pointer;
    width: 0;

    --room_list_quit: rgb(145, 145, 145);
}

.room_list_quit:hover {
    --room_list_quit: white;
}

.room_list_room:hover {
    color: white;
}

.room_list_item:hover > .room_list_quit {
    width: 20px;
}

/*
   on active right now, but should change later to another class (eg. .room_list_selected_item)
   to have it be an indicator of which room is selected.
 */
.room_list_room:active {
    background-color: var(--bg2);
    color: var(--accent);
}
</style>
