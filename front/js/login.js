const login = {
    name: "login",
    data: () => ({
        username: ""
    }),
    props: ["isHidden"],
    emits: ["login"],
    template: `
        <div class="login_wrapper" :class="{ login_hidden: isHidden }">
            <div class="login_popup">
                <div class="login_title">Login</div>
                <label class="login_label" for="username">username</label>
                <input v-model="username" class="login_input" name="username" type="text" />
                <div class="login_submit_wrapper">
                    <button class="login_submit" @click="$emit('login', username)">login</button>
                </div>
            </div>
        </div>`
};