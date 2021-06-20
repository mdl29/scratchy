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
     * @param {Room} room - room in which
     * @param {User} user - user to add in room 
     * @returns {Promise<undefined>} - 
     */
    this.addUserToRoom = async function(room,user){
        console.log(room);
        if ( !room.users.includes(user.id)) {
            room.users.push(user.id);
            this.updateRoom(room);
        }else{
            console.log("user is already in the room");
        }
    };
    
    /**
     *
     * @async
     * @augments ScratchyService
     * @param {Room} room - room in which
     * @param {User} user - user to add in room 
     * @returns {Promise<undefined>} - 
     */
    this.removeUserInRoom = async function(room,user){
        room.usersID = room.usersID.filter( uid => uid != user.id );
        this.updateRoom(room);
    }

    
    
    /**
     *
     * @async
     * @augments ScratchyService
     * @param {Room} room
     * @returns {Promise<Room>} - room information , eg:{ id:"60895dd62d1a706830c31f10" ,title:"example", description : "my description"}
     */
    this.updateRoom = async function(room){
        const reponse = await axios.put(apiUrl+'/room/'+room.id, { title: room.title , description: room.description, users : room.users});
        return reponse.data;
    };

    /**
     * 
     * @async
     * @augments ScratchyService
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @param {string} roomTitle - title of a room, eg:my room
     * @param {string} roomDescription - description of a room, eg:my room description
     * @param {string[]} usersID - List of users IDs
     * @returns {Promise<Room>} - room information , eg:{ id:"60895dd62d1a706830c31f10" ,title:"example", description : "my description"}
     */
    this.createRoom = async function(roomTitle,roomDescription,usersID){
        const reponse = await axios.post(apiUrl+'/room', { title: roomTitle , description: roomDescription , users : usersID});
        return reponse.data;
    };

    /**
     * 
     * @async
     * @augments ScratchyService
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @returns {Promise<Room>} room information , eg:{ id:"60895dd62d1a706830c31f10" ,title:"example"}
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
     * @param {User} user - user to add in room 
     * @returns {Promise<AllRoom>} - all rooms information 
     */
    this.getAllRooms = async function(user){ // put the id between "" 
        let query = (user != undefined) ? "?userId="+user.id : "";
        let reponse = await axios.get(apiUrl+'/room' + query); // make the GET request;
        return reponse.data.rooms;
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
        return reponse.data.users[0];// return data JSON         
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

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} pseudo - loggue user pseudo , eg : "toto"
     * @returns {Promise<undefined|User>} - 
     */
    this.userExistByPseudo = async function(pseudo){
        try{
            return await this.getUserByPseudo(pseudo);
        }catch(e){
            return undefined;
        }
    };

    /**
     *
     * @async
     * @augments ScratchyService
     * @param {string} pseudo - loggue user pseudo , eg : "toto"
     * @returns {Promise<User>} - 
     */
    this.getOrCreateUser = async function(pseudo){
       let user = await this.userExistByPseudo(pseudo);
       if(user == undefined){
         user = await this.createUser(pseudo,"");
       }
       return user ;
    }
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
     * @param {Room} room - room id , eg:60895dd62d1a706830c31f10
     * @returns {Promise<Message[]>} message information. Might be a bug here.
     */
    this.getAllMessagesInRoom = async function(room){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/message?roomId='+room.id) // make the GET request
        let messages = reponse.data.messages;
        for(let msg of messages){
            msg.author = await this.getUserByid(msg.author);
        }
        return messages;// return data JSON 
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