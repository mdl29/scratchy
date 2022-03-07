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
    background-color: var(--bg0);
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
    color: var(--font-text);
    box-shadow: 0 0 10px var(--bg0);
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
    color: var(light-text);
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
    color: var(--dark-text);
    background-color: var(--bg2);
    transition: 0.1s;
}

.login_input:focus {
    color: var(--font-text);
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
    color: var(--font-text);
    padding: 4px 8px;
    cursor: pointer;
    font-size: 0.8em;
}

.login_submit:hover {
    filter: brightness(0.8);
}
</style>
