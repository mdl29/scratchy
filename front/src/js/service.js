/**
 * @author Yannis Malgorn <yannismalgorn@gmail.com>
 * @see {@link https://github.com/mdl29/scratchy|GitHub}
 * @requires module:axios/axios
 */

/*
- add axios cdn link in index.html :
     	<script src="https://unpkg.com/axios@0.21.1/dist/axios.min.js"></script>
- call service.js in index.html :
    <script src="/front/js/service.js"></script>
- start scratchy service : 
    var api = new ScratchyService("http://localhost:5000/api");
    api;
- call a function :
    api.function();|
*/

/**
 * @typedef {Object} Room
 * @property {string} id - Room unique ID.
 * @property {string} description - The room description.
 * @property {string} title - The room title.
 * @property {string[]} users - List of users IDs.
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

/**
 * 
 * @constructor
 * @param {string} apiUrl - api url , eg: http://localhost:5000/api
 */
function ScratchyService(apiUrl) {
    let _this = this;
    this.cacheUsers = []; // List of users, used as cache

//                               ROOM FUNCTIONS


    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @param {string} roomTitle - title of a room , eg:my room
     * @param {string} roomDescription - description of a room, eg:my room description
     * @returns {Promise<Room>} - room information , eg:{ oid:"60895dd62d1a706830c31f10" ,title:"example", description : "my description"}
     */
    this.updateRoom = async function(roomID,roomTitle,roomDescription,usersID){
        const reponse = await axios.put(apiUrl+'/room/'+roomID, { title: roomTitle , description: roomDescription, users : usersID});
        return reponse.data;
    };

    /**
     * 
     * @async
     * @augments ScratchyService
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @param {string} roomTitle - title of a room, eg:my room
     * @param {string} roomDescription - description of a room, eg:my room description
     * @returns {Promise<Room>} - room information , eg:{ oid:"60895dd62d1a706830c31f10" ,title:"example", description : "my description"}
     */
    this.createRoom = async function(roomTitle,roomDescription){
        const reponse = await axios.post(apiUrl+'/room', { title: roomTitle , description: roomDescription });
        return reponse.data;
    };

    /**
     * 
     * @async
     * @augments ScratchyService
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @returns {Promise<Room>} room information , eg:{ oid:"60895dd62d1a706830c31f10" ,title:"example"}
     */
    this.getRoom = async function(roomID){ // put the id between "" 
            // Make a request for a user with a given ID
            let reponse = await axios.get(apiUrl+'/room/'+roomID);// make the GET request
            return reponse.data; // return data JSON           
    };

    
    /**
     * 
     * @async
     * @augments ScratchyService
     * @return {Promise} Empty promise.
     */
     this.deleteRoom = async function(roomID){
        const reponse = await axios.delete(apiUrl+'/room/'+roomID);
        return reponse.data;
    };

    /**
     * 
     * @async
     * @augments ScratchyService
     * @returns {Promise<AllRoom>} - all rooms information 
     */
    this.getAllRooms = async function(){ // put the id between "" 
        let reponse = await axios.get(apiUrl+'/room'); // make the GET request;
        return reponse.data;
    };

//                               USER FUNCTIONS
    
    /**
    * 
    * @async
    * @augments ScratchyService
    * @param {string} userPseudo - a user pseudo , eg:toto
    * @returns {Promise<User>} - user information 
    */
    this.getUserByPseudo = async function(userPseudo){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/user?pseudo='+userPseudo);// make the GET request
        return reponse.data;// return data JSON         
    };

    /**
     * 
     * @async
     * @augments ScratchyService
     * @param {string} userID - user id , eg:60895dd62d1a706830c31f10
     * @returns {Promise<User>} - user information
     */
    this.getUserByid = async function(userID){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/user/'+userID) // make the GET request
        return reponse.data;// return data JSON          
    };

    /**
    * 
    * @async
    * @augments ScratchyService
    * @param {string} userPseudo - a user pseudo , eg:toto
    * @param {string} userProfileImage - profile image link , eg:https://myprofileimage.test/picture.png
    * @returns {Promise<User>} - user id , eg: 60895dd62d1a706830c31f10
    */
    this.createUser = async function(userPseudo,userProfileImage){
        const reponse = await axios.post(apiUrl+'/user', { pseudo: userPseudo , profileImage: userProfileImage });
        return reponse.data;
    };

    /**
    * 
    * @async
    * @augments ScratchyService
    * @return {Promise} Empty promise.
    */
    this.deleteUser = async function(userID){
        const reponse = await axios.delete(apiUrl+'/user/'+userID);
        return reponse;
    };

   /**
     * 
     * @async
     * @augments ScratchyService
     * @param {string} userID - user id , eg:60895dd62d1a706830c31f10
     * @param {string} userPseudo - user pseudo , eg:toto
     * @param {string} userProfileImage - profile image link , eg:https://myprofileimage.test/picture.png
     * @returns {Promise<User>} - user id , eg:60895dd62d1a706830c31f10
     */
    this.updateUser = async function(userID,userPseudo,userProfileImage){
        const reponse = await axios.put(apiUrl+'/user/'+userID, { pseudo: userPseudo , profileImage : userProfileImage});
        return reponse.data;
    };
//                               MESSAGE FUNCTIONS

    /**
     * 
     * @async
     * @augments ScratchyService
     * @param {string} messageID - message id , eg:60895dd62d1a706830c31f10
     * @returns {Promise<Message>} message information 
     */
    this.getMessage = async function(messageID){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/message/'+messageID) // make the GET request
        return reponse.data;// return data JSON  

    };

    /**
     * 
     * @async
     * @augments ScratchyService
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @returns {Promise<Message[]>} message information. Might be a bug here.
     */
    this.getAllMessagesInRoom = async function(roomID){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/message?roomId='+roomID) // make the GET request
        return reponse.data;// return data JSON 
    };

    /**
     * 
     * @async
     * @augments ScratchyService
     * @param {string} authorID - author id , eg:60895dd62d1a706830c31f10
     * @param {string} messageContent - message content , eg:my message content
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @returns {Promise<Message>} message information, eg: author : 60895dd62d1a706830c31f10 , content : hello world , roomId : 60895dd56d1a706830c31f16 
     */
    this.createMessage = async function(authorID,messageContent,roomID){
        const reponse = await axios.post(apiUrl+'/message', { author : authorID , content : messageContent , roomId : roomID });
        return reponse.data;
    };

    /**
     * 
     * @async
     * @augments ScratchyService
     * @param {string} messageID - message id , eg:60895dd62d1a706830c31f10
     * @param {string} messageAuthor - author of the message ID , eg:60895dd62d1a706830c31f10
     * @param {string} messageContent - message content , eg:my message content 
     * @param {string} roomID - Id of the room the message belongs to.
     * @returns {Promise<Message>} message id
     */
    this.updateMessage = async function(messageID,messageAuthor,messageContent,roomID){
        const reponse = await axios.put(apiUrl+'/message/'+messageID, { author: messageAuthor , content: messageContent , roomId : roomID });
        return reponse.data;
    };

    /**
     * 
     * @async
     * @augments ScratchyService
     * @param {string} messageID - message id , eg:60895dd62d1a706830c31f10
     * @return {Promise} Empty promise.
     */
    this.deleteMessage = async function(messageID){
        const reponse = await axios.delete(apiUrl+'/message/'+messageID);
        return reponse.data;
    };
};