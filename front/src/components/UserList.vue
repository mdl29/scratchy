<template>
<ul class="user_list_wrapper">
    <li class="user_list_item" v-for="user in users" :key="user.id"> {{user.pseudo}} </li>
</ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'user-list',
    props: ['users'],
});
</script>

<style scoped>
/*
 * not sure how this is supposed to look (on the final thing) so not much rn
 */

.user_list_wrapper {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    background-color: var(--bg3);
    width: fit-content;
    padding: 5px;
    margin: 0;
    max-width: 130px;
    overflow-y: auto;
    overflow-x: hidden;
}

.user_list_item {
    color: var(--font-text);
    margin-top: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    padding-left: 10px;
    box-sizing: border-box;
}
</style>
