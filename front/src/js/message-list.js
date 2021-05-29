const messages = {
    name: 'messages',
    props: ['messages'],
    methods: {
        humanDate(ts,now){
            return moment(ts).fromNow();
        }
    },
    data: function(){
        return {
            now: new Date()
        };
    },
    created() {
        var self = this
        setInterval(function () {
             self.now = new Date();
        }, 2000)
    },
    computed(){

    },
    template: `
    <ul class="messages_list_wrapper">
        <li v-for="msg in messages" class="messages_item" :key="msg.id">
            <div class="messages_title">
                <span class="messages_author"> {{msg.author}} </span>
                <span class="messages_timestamp"> {{ humanDate(msg.timestamp, now) }} </span>
            </div>
            <div class="messages_content">
                {{msg.content}}
            </div>
        </li>
    </ul>
    `,
};