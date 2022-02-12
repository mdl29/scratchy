/**
 * @author Yannis Malgorn <yannismalgorn@gmail.com>
 * @author vndx
 * @author Benjamin BERNARD
 * @see {@link https://github.com/mdl29/scratchy|GitHub}
 * @requires module:axios/axios
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

import axios from 'axios';

/**
 * @typedef {Object} Room
 * @property {string} id - Room unique ID.
 * @property {string} description - The room description.
 * @property {string} title - The room title.
 * @property {string[]} usersID - List of users IDs.
 */
// ^ usersID should be users
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

// kinda not DRY but tbh idk what to do here so code dupe with minor format changes it is.

// yes that is stupid, but its what the api gives us.
export interface RoomList {
    rooms: Room[]
}

export interface Room {
    id: string,
    description: string,
    title: string,
    // jsdoc is wrong here for some reason.
    users: string[]
}

export interface Message {
    id: string,
    authorID: string,
    content: string,
    roomID: string
}

export interface User {
    id: string,
    pseudo: string,
    profileImage: string,
    rooms: string[]
}


export class ScratchyService {
    /**
     *
     * @constructor
     * @param {string} apiUrl - api url, eg: http://localhost:5000/api
     */
    apiUrl: string;
    userCache: Map<string, User>;
    roomCache: Map<string, Room>;
    messageCache: Map<string, Message>;
    userPseudoMap: Map<string, string>;

    constructor(apiUrl: string) {
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
    async addUserToRoom(room: Room, user: User): Promise<void> {
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
    async removeUserInRoom(room: Room, user: User): Promise<void> {
        room.users = room.users.filter((uid: string) => uid != user.id);
        await this.updateRoom(room);
    }

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {Room} room room to be updated
     * @returns {Promise<Room>} - room information, eg: `{ id: "60895dd62d1a706830c31f10", title: "example", description: "my description" }`
     */
    async updateRoom(room: Room): Promise<Room> {
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
     * @param {string} roomTitle - title the room
     * @param {string} roomDescription - description of the room
     * @param {string[]} usersID - List of users IDs
     * @returns {Promise<Room>} - room information, eg: `{ id: "60895dd62d1a706830c31f10", title: "example", description: "my description" }`
     */
    async createRoom(roomTitle: string, roomDescription: string, usersID: string[]): Promise<Room> {
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
    async getRoom(roomID: string): Promise<Room> {
        if (this.roomCache.has(roomID)) return this.roomCache.get(roomID) as Room;
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
    async deleteRoom(roomID: string): Promise<void> {
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
    // jsdoc wrong ?
    async getAllRooms(user: User): Promise<Room[]> {
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
    async getUserByPseudo(userPseudo: string): Promise<User> {
        if (this.userPseudoMap.has(userPseudo)) {
            // userPseudoMap.has(userPseudo) implies userCache.has(user)
            return this.userCache.get(this.userPseudoMap.get(userPseudo) as string) as User;
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
    async getUserByid(userID: string): Promise<User> {
        if (this.userCache.has(userID)) {
            return this.userCache.get(userID) as User;
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
    async createUser(userPseudo: string, userProfileImage: string): Promise<User> {
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
    async deleteUser(userID: string): Promise<void> {
        if (this.userCache.has(userID)) {
            // userCache.get(userID) can't be undefined because userCache.has(userID) is true.
            // unless race condition ofc but that shouldn't happen.
            const pseudo = (this.userCache.get(userID) as User).pseudo;
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
    async updateUser(userID: string, userPseudo: string, userProfileImage: string): Promise<User> {
        // update cache
        if (this.userCache.has(userID)) {
            const user = this.userCache.get(userID) as User;
            // update pseudo map if pseudo has changed
            if (user.pseudo !== userPseudo) {
                this.userPseudoMap.set(userPseudo, userID);
            }
            user.pseudo = userPseudo;
            user.profileImage = userProfileImage;
            this.userCache.set(userID, user);
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
    async userExistByPseudo(pseudo: string): Promise<User | undefined> {
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
    async getOrCreateUser(pseudo: string): Promise<User> {
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
    async getMessage(messageID: string): Promise<Message> {
        if (this.messageCache.has(messageID)) return this.messageCache.get(messageID) as Message;

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
    async getAllMessagesInRoom(room: Room): Promise<Message[]> {
        const response = await axios.get(this.apiUrl + "/message?roomId=" + room.id); // make the GET request
        const messages = response.data.messages;
        for (const msg of messages) {
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
    async createMessage(authorID: string, messageContent: string, roomID: string): Promise<Message> {
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
    async updateMessage(messageID: string, messageAuthor: string, messageContent: string, roomID: string): Promise<Message> {
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
    async deleteMessage(messageID: string): Promise<void> {
        const response = await axios.delete(this.apiUrl + "/message/" + messageID);
        this.messageCache.delete(messageID);
        return response.data;
    }
}