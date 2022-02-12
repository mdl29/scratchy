<template>
<ul class="messages_list_wrapper">
    <li v-for="msg in messages" class="messages_item" :key="msg.id">
        <div class="messages_title">
            <span class="messages_author"> {{msg.author.pseudo}} </span>
            <span class="messages_timestamp"> {{ humanDate(msg.timestamp) }} </span>
        </div>
        <div class="messages_content">
            {{msg.content}}
        </div>
    </li>
</ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';

// NOTE(vndx): I might have broken whatever (already somewhat  broken) timestamp timezone code
// is going on there, but it needs a refractor anyways since it didn't even work.

export default defineComponent({
    name: 'message-list',
    props: ['messages'],
    methods: {
        humanDate(ts: string){
            return moment(ts).fromNow();
        },
    },
    data: function(){
        return {
            now: new Date()
        };
    },
    created() {
        moment.relativeTimeThreshold('s', 60);
        moment.relativeTimeThreshold('m', 60);
        moment.relativeTimeThreshold('h', 24);
        moment.relativeTimeThreshold('d', 31);
        moment.relativeTimeThreshold('M', 12);
        moment.relativeTimeThreshold('y', 365);

        setInterval(() => {
             this.now = new Date();
        }, 2000)
    },
});
</script>

<style scoped>
.messages_list_wrapper {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    background-color: var(--bg4);
    margin: 0;
    padding-bottom: 50px;
    flex-grow: 2;
    overflow-y: auto;
}

.messages_item {
    margin-top: 20px;
}

.messages_title {
    display: flex;
    align-items: center;
}

.messages_author {
    color: var(--accent);
    margin-right: 20px;
}

.messages_timestamp {
    color: var(--bg2);
    filter: brightness(1.5);
    font-size: 0.6em;
}

.messages_content {
    margin-top: 5px;
    color: #ddd;
    font-size: smaller;
}
</style>
