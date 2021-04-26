const userList = {
    name: 'user-list',
    props: ['users'],
    template: `
    <ul class="user_list_wrapper">
        <li class="user_list_item" v-for="user in users" :key="user._id.$oid"> {{user.pseudo}} </li>
    </ul>
    `,
};