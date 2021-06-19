const messages = {
    name: 'messages',
    props: ['messages'],
    methods: {
        humanDate(ts,now){
            console.log(ts);
            return moment(ts).fromNow();
        },
        async getAuthor(id){
            return await this.srv.getUserByid(id);
        }

    },
    data: function(){
        return {
            now: new Date(),
            srv: new ScratchyService("http://localhost:5000/api")
        };
    },
    created() {
        moment.relativeTimeThreshold('s', 60);
        moment.relativeTimeThreshold('m', 60);
        moment.relativeTimeThreshold('h', 24);
        moment.relativeTimeThreshold('d', 31);
        moment.relativeTimeThreshold('M', 12);
        moment.relativeTimeThreshold('y', 365);
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