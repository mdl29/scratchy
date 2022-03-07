<template>
    <div id="app">
        <login v-on:login="onLogin($event)" v-if="!isConnected"></login>
        <room-editor v-if="!roomEditorHidden" v-model:hidden="roomEditorHidden" v-on:create-room="createRoom($event)" v-on:join-room="joinRoom($event)"></room-editor>
        <div class="app_vertical_layout">
            <div class="app_top_horizontal_layout">
                <room-list v-model:rooms="rooms" v-on:room-selected="displayRoom($event)" v-on:room-quit="quitRoom($event)"></room-list>
                <div class="app_messages_list_wrapper">
                    <activity-bar v-bind:current-room="selectedRoom" v-bind:is-writing="isWriting"></activity-bar>
                    <message-list v-bind:messages="messages"></message-list>
                </div>
                <user-list v-bind:users="users"></user-list>
            </div>
            <div class="app_bottom_horizontal_layout">
                <div class="app_room_editor_start" @click="roomEditorHidden = false">
                    <div class="app_room_editor_plus"></div>
                </div>
                <message-editor v-model:content="currentTypedMessage" v-on:send-message="onMessageSend($event)" v-on:start-writing="isWriting = true" v-on:stop-writing="isWriting = false"></message-editor>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
    ScratchyService,
    Room,
    Message,
    User
} from './service'
import MessageEditor from './components/MessageEditor.vue';
import MessageList from './components/MessageList.vue';
import ActivityBar from './components/ActivityBar.vue';
import RoomEditor from './components/RoomEditor.vue';
import UserList from './components/UserList.vue';
import RoomList from './components/RoomList.vue';
import Login from './components/Login.vue';

// note: this assumes port 5000 isn't that bad ?
const srv = new ScratchyService("http://"+window.location.hostname+":5000/api");

interface RoomData {
    title: string,
    description: string
}

export default defineComponent({
    name: "App",
    components: {
        MessageEditor,
        MessageList,
        ActivityBar,
        RoomEditor,
        UserList,
        RoomList,
        Login,
    },
    data: () => ({
        selectedRoom: null      as null | Room,
        isWriting: false        as boolean,
        // current user
        loggedUser: null        as null | User,
        roomEditorHidden: true  as boolean,
        currentTypedMessage: "" as string,
        // displayed rooms -> RoomList.vue
        rooms: []               as Room[],
        // displayed users -> UserList.vue
        users: []               as User[],
        // displayed messages -> MessageList.vue
        messages: []            as Message[]
    }),
    mounted() {
        this.fetchRooms();
        // polling
        setInterval(() => {
            this.fetchMessages();
            this.fetchCurrentRoomUsers();
        }, 1000);
    },
    methods: {
        async fetchRooms() {
            if(this.loggedUser === null) return;
            this.rooms = await srv.getAllRooms(this.loggedUser)
        },
        async fetchMessages() {
            if(this.selectedRoom === null) return;
            this.messages = await srv.getAllMessagesInRoom(this.selectedRoom);
        },
        async fetchCurrentRoomUsers() {
            if(this.selectedRoom === null) return;
            let room = await srv.getRoom(this.selectedRoom.id);
            this.selectedRoom = room;
            this.users = await Promise.all(room.users.map((id: string) => srv.getUserByid(id)));
        },
        async onMessageSend() { // as name suggest, this is called when the message send button is pressed
            if(this.selectedRoom === null) return;
            // shouldn't happen, in theory.
            if (this.loggedUser === null) {
                console.warn("trying to send messages without being logged in.")
                return;
            }
            await srv.createMessage(this.loggedUser.id, this.currentTypedMessage, this.selectedRoom.id);
            // clear message field
            this.currentTypedMessage = "";
        },
        async displayRoom(room: Room) { // called when selecting a room in RoomList
            this.selectedRoom = room;
            this.users = await Promise.all(room.users.map(id => srv.getUserByid(id)));
            this.messages = await srv.getAllMessagesInRoom(room);
        },
        async quitRoom(room: Room) {
            if (this.loggedUser === null) {
                console.warn("trying to quit room without being logged in.")
                return;
            }
            // remove current user from the room
            await srv.removeUserInRoom(room, this.loggedUser);
            // update the rooms
            await this.fetchRooms();
            // select another room if we quit the selected one
            if(this.selectedRoom !== null && room.id == this.selectedRoom.id) {
                if(this.rooms.length > 0) { // default to the last room when quitting the currently selected room
                    this.selectedRoom = this.rooms[this.rooms.length-1];
                } else { // or just go back to the default if there aren't any rooms
                    this.selectedRoom = null
                }
            }
            this.messages = []; // reset displayed messages, this will be overwritten by the polling
            this.users = []; // same
        },
        async createRoom(roomData: RoomData) {
            if (this.loggedUser === null) {
                console.warn("trying to create room without being logged in.")
                return;
            }
            await srv.createRoom(roomData.title, roomData.description,[this.loggedUser.id]);
            this.roomEditorHidden = true;
            // update room list
            await this.fetchRooms();
        },
        async joinRoom(id: string) {
            if (this.loggedUser === null) {
                console.warn("trying to join room without being logged in.")
                return;
            }
            const room = await srv.getRoom(id);
            // add current user to the room
            await srv.addUserToRoom(room,this.loggedUser);
            this.roomEditorHidden = true;
            await this.fetchRooms();
        },
        async onLogin(pseudo: string) {
            this.loggedUser = await srv.getOrCreateUser(pseudo);
            await this.fetchRooms();
        },
    },
    computed: {
        // is this really necessary ?
        isConnected() {
            return this.loggedUser !== null;
        }
    }
});
</script>

<style>
/* a wise man once said, "there's nothing as permanent than a temporary solution" */
/*
    probably not final style, just a kind of draft
*/
* {
    /* background colors */
    --bg0 : rgba(0, 0, 0, 0.2);
    --bg1: #1e1d24;
    --bg2: #4c4953;
    --bg3: #393842;
    --bg4: #2a2931;
    --accent: rgb(14, 247, 149);
    /* text fonts */
    --font-text: white ;
    --light-text:rgb(189, 189, 189);
    --dark-text: rgb(158, 158, 158);
    /* size */
    --font-size: 25px;
    --small-font-size : 0.8em;
    --border-radius: 6px;
}

body {
    background-color: var(--bg1);
    margin: 0;
    font-size: var(--font-size);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
<style scoped>
#app {
    width: 100vw;
    height: 100vh;
    padding: 0;
}

.app_vertical_layout {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.app_top_horizontal_layout {
    flex-grow: 1;
    display: flex;
    width: 100%;
    overflow-y: auto;
}

.app_bottom_horizontal_layout {
    flex-grow: 0;
    display: flex;
    padding: 5px;
    background-color: var(--bg3);
    box-shadow: rgba(0, 0, 0, 0.335) 0 0 3px;
}

.app_messages_list_wrapper {
    flex-grow: 2;
    display: flex;
    flex-direction: column;
}

/*
 * :nth-child(2n+1) select every odd numbered child
 * (meaning the first and last in this instance,
 * i did it this way (and not in the css of the actual
 * components) because the shadow is here to highlight
 * the limits of components, and is linked to the layout
 * those a setup in (layout described in this file)
 */
.app_top_horizontal_layout > *:nth-child(2n+1) {
    position: relative;
    z-index: 2;
    box-shadow: rgb(37, 37, 37) 0 0 3px;
}

.app_room_editor_start {
    cursor: pointer;
    transition: 0.1s all;
    width: 50px;
    height: 50px;
    margin-right: 5px;
    background-color: var(--accent);
    border-radius: var(--border-radius);
}

.app_room_editor_start:hover {
    filter: brightness(0.9);
}

.app_room_editor_plus {
    clip-path: polygon(52.5% 0, 47.5% 0, 47.5% 47.5%, 0 47.5%, 0 52.5%, 47.5% 52.5%, 47.5% 100%, 52.5% 100%, 52.5% 52.5%, 100% 52.5%, 100% 47.5%, 52.5% 47.5%);
    background-color: white;
    width: 50px;
    height: 50px;
    transform: scale(0.8);
}
</style>
