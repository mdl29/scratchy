<template>
    <div class='activity_bar'>
    <template v-if="currentRoom !== null">
        <div class='activity_bar_room'>
            {{currentRoom.title}}    
        </div>
        <button v-on:click="popup = true" class="button_popup"><img src="../assets/share-icon-white.svg" id="popup_icon"></button>
        <div v-if="isWriting" class='activity_bar_writing'> writing... </div>
        <div class="share_popup_background" v-if="popup">
            <div class="share_popup">
                <div class="share_title">Share room id</div>
                <div class="room_id">
                    <label class="share_label"> room id: &nbsp;</label>
                    <input class="room_id_input" :value="currentRoom.id" readonly >
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
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "activity-bar",
    props: ["currentRoom", "isWriting"],
    data: () => ({
        popup: false
    }),
    methods: {
        copy(){
            let input = document.querySelector('.room_id_input') as HTMLInputElement;
            input.focus();
            input.select();
            document.execCommand('copy');

        }
    },
});
</script>

<style scoped>
.button_popup{
    background-color:var(--bg2);
    border-radius:4px;
    border: none;
    padding: 0.3em;
    margin-left: 0.7em;
    transition: all 0.1s;
    cursor: pointer;
}
.button_popup:hover {
    filter: brightness(1.2);
}

#popup_icon{
    size: 3px !important;
}
.share_popup {
    background-color: var(--bg3);
    border-radius: 7px;
    flex-direction: column;
    padding: 10px 15px;
    display: flex;
    justify-content: space-evenly;
    color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.room_id {
    display: flex;
}

.room_id > span {
    color:white;
}

.share_popup_background {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    z-index: 99;
}

.share_popup > * {
    --margin: 10px;

    margin-top: var(--margin);
    margin-bottom: var(--margin);
}

.share_title {
    width: 100%;
    text-align: center;
    font-size: smaller;
}

.share_label {
    color: rgb(189, 189, 189);
    font-size: 0.9em;
    margin-bottom: 0;
}

.share_input {
    margin-top: 3px;
    outline: 0;
    border: none;
    border-radius: 4px;
    padding: 5px;
    font-size: 0.9em;
    color: rgb(173, 173, 173);
    background-color: var(--bg2);
    transition: 0.1s;
}

.share_input:focus {
    color: white;
}

.share_submit_wrapper {
    display: flex;
    flex-direction: row-reverse;
}

.share_submit {
    border: none;
    transition: 0.1s;
    border-radius: 4px;
    background-color: var(--accent);
    color: white;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 0.8em;
}

.share_submit:hover {
    filter: brightness(0.8);
}
.activity_bar_popup {
    visibility: hidden ;
}
.activity_bar {
    width: 100%;
    display: flex;
    background-color: var(--bg3);
    margin: 0;
    color: white;
    padding: 10px;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
}

.activity_bar_writing {
    padding-left: 10px;
    font-size: smaller;
    color: rgb(168, 168, 168);
}

.activity_bar_room::before {
    content: "# ";
    color: rgb(172, 172, 172);
}

.activity_bar_writing::before {
    content: "|";
}
.room_id_input{
    text-align: left;
    color : white ;
    font-size: 25px ;
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden ;
    border-bottom-style: hidden;
    background-color:var(--bg3);
}
.room_id_input:focus{
    outline: none;
}

.copy_button {
    width: 100px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    height: 30px;
    margin: auto;
    text-align:center;
    border: none;
    background-size: 300% 100%;

    border-radius: 50px;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.copy_button:hover {
    background-position: 100% 0;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.copy_button:focus {
    outline: none;
}

.copy_button.gradient {
    background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
    box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
}
.copy_wrapper {
  display: flex;
}
</style>
