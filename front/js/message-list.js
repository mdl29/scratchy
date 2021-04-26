const messages = {
    name: 'messages',
    props: ['messages'],
    methods: {
        humanDate(ts){
            return moment(ts).fromNow();
        }
    },
    template: `
    <ul class="messages_list_wrapper">
        <li v-for="msg in messages" class="messages_item" :key="msg.id">
            <div class="messages_title">
                <span class="messages_author"> {{msg.author}} </span>
                <span class="messages_timestamp"> {{humanDate(msg.timestamp)}} </span>
            </div>
            <div class="messages_content">
                {{msg.content}}
            </div>
        </li>
    </ul>
    `,
};