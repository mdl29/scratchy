<template>
<div class="login_wrapper">
    <div class="login_popup">
        <div class="login_title">Login</div>
        <label class="login_label" for="pseudo">pseudo</label>
        <input v-model="pseudo" class="login_input" name="pseudo" type="text" />
        <div class="login_submit_wrapper">
            <button class="login_submit" @click="$emit('login', pseudo)">login</button>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "login",
    data: () => ({
        pseudo: ""
    }),
    emits: ["login"],
});
</script>

<style scoped>
.login_wrapper {
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}

.login_popup {
    background-color: var(--bg3);
    border-radius: 7px;
    flex-direction: column;
    padding: 10px 15px;
    display: flex;
    justify-content: space-evenly;
    color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.login_popup > * {
    --margin: 10px;

    margin-top: var(--margin);
    margin-bottom: var(--margin);
}

.login_title {
    width: 100%;
    text-align: center;
    font-size: smaller;
}

.login_label {
    color: rgb(189, 189, 189);
    font-size: 0.9em;
    margin-bottom: 0;
}

.login_input {
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

.login_input:focus {
    color: white;
}

.login_submit_wrapper {
    display: flex;
    flex-direction: row-reverse;
}

.login_submit {
    border: none;
    transition: 0.1s;
    border-radius: 4px;
    background-color: var(--accent);
    color: white;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 0.8em;
}

.login_submit:hover {
    filter: brightness(0.8);
}
</style>
