const messages = {
    name: 'messages',
    props: ['messages'],
    methods: {
        humanDate(ts,now){
            return moment(ts).fromNow();
        },
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
    computed(){

    },
    template: `
    <ul class="messages_list_wrapper">
        <li v-for="msg in messages" class="messages_item" :key="msg.id">
            <div class="messages_title">
                <span class="messages_author"> {{msg.author.pseudo}} </span>
                <span class="messages_timestamp"> {{ humanDate(msg.timestamp, now) }} </span>
            </div>
            <div class="messages_content">
                {{msg.content}}
            </div>
        </li>
    </ul>
    `,
};