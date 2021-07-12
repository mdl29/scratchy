/**
 * @author Yannis Malgorn <yannismalgorn@gmail.com>
 * @author Titouan Goulois
 * @author Benjamin BERNARD
 * @see {@link https://github.com/mdl29/scratchy|GitHub}
 * @requires module:axios/axios
 */

/*
- add axios cdn link in index.html :
     	<script src="https://unpkg.com/axios@0.21.1/dist/axios.min.js"></script>
- call service.js in index.html :
    <script src="/front/js/service.js"></script>
- start scratchy service : 
    const api = new ScratchyService("http://localhost:5000/api");
    api;
- call a function :
    api.function();|
*/

// NOTE: the cache here breaks the pulling of the users that keeps the user list updated
// and while this code could keep a timestamp of when some data has been obtained and 
// have it clear this data from the cache when it is considered outdated, i do not think
// this should be implementd this way, and i find that websockets would be more appropriate.
// since both cacheing and websockets are planned for V2 I will keep the current (although
// buggy) implementation.
//
// PS: it doesn't break the pulling of the messages as those are not cached because they change
// too often.

/**
 * @typedef {Object} Room
 * @property {string} id - Room unique ID.
 * @property {string} description - The room description.
 * @property {string} title - The room title.
 * @property {string[]} usersID - List of users IDs.
 */

/**
 * @typedef {Object} AllRoom
 * @property {Room[]} List of rooms.
 */

/**
 * @typedef {Object} Message
 * @property {string} id - Message unique ID.
 * @property {string} authorID - author id , eg:60895dd62d1a706830c31f10
 * @property {string} content - message content , eg:my message content
 * @property {string} roomID - room id , eg:60895dd62d1a706830c31f10
 */

/**
 * @typedef {Object} User
 * @property {string} id - User unique ID.
 * @property {string} pseudo - user nickname / pseudo
 * @property {string} profileImage - URL of the profile image.
 * @property {string[]} rooms - List of room IDs the user belongs to.
 */


class ScratchyService {
    /**
     *
     * @constructor
     * @param {string} apiUrl - api url, eg: http://localhost:5000/api
     */
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.userCache = new Map();
        this.roomCache = new Map();
        this.messageCache = new Map();
        // a Map<pseudo, userID> to retreive a user from the cache by its pseudo faster
        this.userPseudoMap = new Map();
    }

    //                               ROOM FUNCTIONS

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {Room} room - affected room
     * @param {User} user - user to be added
     * @returns {Promise<undefined>} -
     */
    async addUserToRoom(room, user) {
        if (!room.users.includes(user.id)) {
            room.users.push(user.id);
            await this.updateRoom(room);
        } else {
            console.warn("user is already in the room");
        }
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {Room} room - affected room
     * @param {User} user - user to be removed
     * @returns {Promise<undefined>} -
     */
    async removeUserInRoom(room, user) {
        room.users = room.users.filter((uid) => uid != user.id);
        await this.updateRoom(room);
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {Room} room room to be updated
     * @returns {Promise<Room>} - room information, eg: `{ id: "60895dd62d1a706830c31f10", title: "example", description: "my description" }`
     */
    async updateRoom(room) {
        const response = await axios.put(this.apiUrl + "/room/" + room.id, {
            title: room.title,
            description: room.description,
            users: room.users,
        });
        this.roomCache.set(room.id, response.data);
        return response.data;
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} roomID - room id
     * @param {string} roomTitle - title the room
     * @param {string} roomDescription - description of the room
     * @param {string[]} usersID - List of users IDs
     * @returns {Promise<Room>} - room information, eg: `{ id: "60895dd62d1a706830c31f10", title: "example", description: "my description" }`
     */
    async createRoom(roomTitle, roomDescription, usersID) {
        const response = await axios.post(this.apiUrl + "/room", {
            title: roomTitle,
            description: roomDescription,
            users: usersID,
        });
        this.roomCache.set(response.data.id, response.data);
        return response.data;
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} roomID - room id
     * @returns {Promise<Room>} - room information, eg: `{ id: "60895dd62d1a706830c31f10", title: "example", description: "my description" }`
     */
    async getRoom(roomID) {
        if(this.roomCache.has(roomID)) return this.roomCache.get(roomID);
        const response = await axios.get(this.apiUrl + "/room/" + roomID);
        this.roomCache.set(roomID, response.data);
        return response.data;
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @return {Promise} promise that will be resolved when room is deleted.
     */
    async deleteRoom(roomID) {
        this.roomCache.delete(roomID);
        await axios.delete(this.apiUrl + "/room/" + roomID);
    }

    //? not sure if i should cache that
    /**
     *
     * @async
     * @augments ScratchyService
     * @param {User} user - user to add in room
     * @returns {Promise<AllRoom>} - all rooms information
     */
    async getAllRooms(user) {
        const response = await axios.get(this.apiUrl + "/room?userId=" + user.id);
        return response.data.rooms;
    }

    //                               USER FUNCTIONS

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} userPseudo - a user's pseudo
     * @returns {Promise<User>} - user information
     */
    async getUserByPseudo(userPseudo) {
        if(this.userPseudoMap.has(userPseudo)) {
            // userPseudoMap.has(userPseudo) implies userCache.has(user)
            return this.userCache.get(this.userPseudoMap.get(userPseudo));
        }
        const response = await axios.get(this.apiUrl + "/user?pseudo=" + userPseudo); // make the GET request
        this.userPseudoMap.set(userPseudo, response.data.id);
        this.userCache.set(response.data.id, response.data);
        return response.data.users[0]; // return data JSON
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} userID - user id , eg:60895dd62d1a706830c31f10
     * @returns {Promise<User>} - user information
     */
    async getUserByid(userID) {
        if (this.userCache.has(userID)) {
            return this.userCache.get(userID);
        }
        // Make a request for a user with a given ID
        const response = await axios.get(this.apiUrl + "/user/" + userID); // make the GET request
        this.userCache.set(userID, response.data);
        this.userPseudoMap.set(response.data.pseudo, userID);
        return response.data; // return data JSON
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} userPseudo - a user pseudo
     * @param {string} userProfileImage - profile image link
     * @returns {Promise<User>} - user id
     */
    async createUser(userPseudo, userProfileImage) {
        const response = await axios.post(this.apiUrl + "/user", {
            pseudo: userPseudo,
            profileImage: userProfileImage,
        });
        this.userCache.set(response.data.id, response.data);
        this.userPseudoMap.set(response.data.pseudo, response.data.id);
        return response.data;
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @return {Promise} Empty promise.
     */
    async deleteUser(userID) {
        if(this.userCache.has(userID)) {
            const pseudo = this.userCache.get(userID).pseudo;
            this.userCache.delete(userID);
            this.userPseudoMap.delete(pseudo);
        }
        await axios.delete(this.apiUrl + "/user/" + userID);
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} userID - user id
     * @param {string} userPseudo - a user's pseudo
     * @param {string} userProfileImage - profile image link
     * @returns {Promise<User>} - user information
     */
    async updateUser(userID, userPseudo, userProfileImage) {
        // update cache
        if(this.userCache.has(userID)) {
            const user = this.userCache.get(userID);
            // update pseudo map if pseudo has changed
            if(user.pseudo !== userPseudo) {
                this.userPseudoMap.delete(pseudo);
                this.userPseudoMap.set(userPseudo, userID);
            }
            user.pseudo = userPseudo;
            user.profileImage = userProfileImage;
            this.userCache.set(usersID, user);
        }
        const response = await axios.put(this.apiUrl + "/user/" + userID, {
            pseudo: userPseudo,
            profileImage: userProfileImage,
        });
        return response.data;
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} pseudo - the pseudo that will be checked
     * @returns {Promise<undefined|User>} - the user or undefined if none exist
     */
    async userExistByPseudo(pseudo) {
        try {
            return await this.getUserByPseudo(pseudo);
        } catch (e) {
            return undefined;
        }
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} pseudo - the pseudo
     * @returns {Promise<User>} -
     */
    async getOrCreateUser(pseudo) {
        let user = await this.userExistByPseudo(pseudo);
        if (user === undefined) {
            user = await this.createUser(pseudo, "");
        }
        return user;
    }
    //                               MESSAGE FUNCTIONS

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} messageID - message id
     * @returns {Promise<Message>} message information
     */
    async getMessage(messageID) {
        if(this.messageCache.has(messageID)) return this.messageCache.get(messageID);

        const response = await axios.get(this.apiUrl + "/message/" + messageID); // make the GET request
        this.messageCache.set(messageID, response.data);
        return response.data; // return data JSON
    }
    // caching this doesn't make much sense as it is what will change the most
    // with most changes being made by other clients
    /**
     *
     * @async
     * @augments ScratchyService
     * @param {Room} room - room id
     * @returns {Promise<Message[]>} message information
     */
    async getAllMessagesInRoom(room) {
        let response = await axios.get(this.apiUrl + "/message?roomId=" + room.id); // make the GET request
        let messages = response.data.messages;
        for (let msg of messages) {
            msg.author = await this.getUserByid(msg.author);
        }
        return messages; // return data JSON
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} authorID - author id
     * @param {string} messageContent - message content
     * @param {string} roomID - room id
     * @returns {Promise<Message>} message information, eg: author : 60895dd62d1a706830c31f10 , content : hello world , roomId : 60895dd56d1a706830c31f16
     */
    async createMessage(authorID, messageContent, roomID) {
        const response = await axios.post(this.apiUrl + "/message", {
            author: authorID,
            content: messageContent,
            roomId: roomID,
        });
        this.messageCache.set(response.data.id, response.data);
        return response.data;
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} messageID - message id
     * @param {string} messageAuthor - the author of the message's id
     * @param {string} messageContent - message content
     * @param {string} roomID - Id of the room the message belongs to.
     * @returns {Promise<Message>} message id
     */
    async updateMessage(messageID, messageAuthor, messageContent, roomID) {
        const response = await axios.put(this.apiUrl + "/message/" + messageID, {
            author: messageAuthor,
            content: messageContent,
            roomId: roomID,
        });
        this.messageCache.set(response.data.id, response.data);
        return response.data;
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} messageID - message id , eg:60895dd62d1a706830c31f10
     * @return {Promise} Empty promise.
     */
    async deleteMessage(messageID) {
        const response = await axios.delete(this.apiUrl + "/message/" + messageID);
        this.messageCache.delete(messageID);
        return response.data;
    }
}
