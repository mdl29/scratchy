const login = {
    name: "login",
    data: () => ({
        pseudo: ""
    }),
    emits: ["login"],
    template: `
        <div class="login_wrapper">
            <div class="login_popup">
                <div class="login_title">Login</div>
                <label class="login_label" for="pseudo">pseudo</label>
                <input v-model="pseudo" class="login_input" name="pseudo" type="text" />
                <div class="login_submit_wrapper">
                    <button class="login_submit" @click="$emit('login', pseudo)">login</button>
                </div>
            </div>
        </div>`
};