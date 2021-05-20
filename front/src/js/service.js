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

function ScratchyService(apiUrl) {
    let _this = this;
    this.cacheUsers = []; // List of users, used as cache

//                               ROOM FUNCTIONS


    /**
     * @typedef {Object} Room
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @param {string} roomTitle - title of a room , eg:my room
     * @param {string} roomDescription - description of a room, eg:my room description
     * @returns {Room} - room information , eg:{ oid:"60895dd62d1a706830c31f10" ,title:"example", description : "my description"}
     */
    this.updateRoom = async function(roomId,roomTitle,roomDescription){
        const reponse = await axios.put(apiUrl+'/room/'+roomId, { title: roomTitle , description: roomDescription });
        return reponse.data;
    };

    /**
     * 
     * @typedef {Object} Room
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @param {string} roomTitle - title of a room, eg:my room
     * @param {string} roomDescription - description of a room, eg:my room description
     * @returns {Room} - room information , eg:{ oid:"60895dd62d1a706830c31f10" ,title:"example", description : "my description"}
     */
    this.createRoom = async function(roomTitle,roomDescription){
        const reponse = await axios.post(apiUrl+'/room', { title: roomTitle , description: roomDescription });
        return reponse.data;
    };

    /**
     * 
     * @typedef {Object} Room
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @returns {Room} room information , eg:{ oid:"60895dd62d1a706830c31f10" ,title:"example"}
     */
    this.getRoom = async function(roomID){ // put the id between "" 
            // Make a request for a user with a given ID
            let reponse = await axios.get(apiUrl+'/room/'+roomID);// make the GET request
            return reponse.data; // return data JSON           
    };

    
    /**
     * 
     * @typedef {Object} Room
     */
     this.deleteRoom = async function(roomID){
        const reponse = await axios.delete(apiUrl+'/room/'+roomID);
    };

    /**
     * 
     * @typedef {Object} Room
     * @returns {array} - all rooms information 
     */
    this.getAllRooms = async function(){ // put the id between "" 
        let reponse = await axios.get(apiUrl+'/room'); // make the GET request;
        return reponse.data;
    };

//                               USER FUNCTIONS
    
    /**
    * 
    * @typedef {Object} User
    * @param {string} userPseudo - a user pseudo , eg:toto
    * @returns {User} - user information 
    */
    this.getUserByPseudo = async function(userPseudo){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/user?pseudo='+userPseudo);// make the GET request
        return reponse.data;// return data JSON         
    };

    /**
     * 
     * @typedef {Object} User
     * @param {string} userID - user id , eg:60895dd62d1a706830c31f10
     * @returns {User} - user information
     */
    this.getUserByid = async function(userID){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/user/'+userID) // make the GET request
        return reponse.data;// return data JSON          
    };

    /**
    * 
    * @typedef {Object} User
    * @param {string} userPseudo - a user pseudo , eg:toto
    * @param {string} userProfileImage - profile image link , eg:https://myprofileimage.test/picture.png
    * @returns {string} - user id , eg: 60895dd62d1a706830c31f10
    */
    this.createUser = async function(userPseudo,userProfileImage){
        const reponse = await axios.post(apiUrl+'/user', { pseudo: userPseudo , profileImage: userProfileImage });
        return reponse.data;
    };

    /**
    * 
    * @typedef {Object} User
    */
    this.deleteUser = async function(userID){
        const reponse = await axios.delete(apiUrl+'/user/'+userID);
    };

   /**
     * 
     * @typedef {Object} User
     * @param {string} userID - user id , eg:60895dd62d1a706830c31f10
     * @param {string} userPseudo - user pseudo , eg:toto
     * @param {string} userProfileImage - profile image link , eg:https://myprofileimage.test/picture.png
     * @returns {string} - user id , eg:60895dd62d1a706830c31f10
     */
    this.updateUser = async function(userID,userPseudo,userProfileImage){
        const reponse = await axios.put(apiUrl+'/user/'+userID, { pseudo: userPseudo , profileImage : userProfileImage});
        return reponse.data;
    };
//                               MESSAGE FUNCTIONS

    /**
     * 
     * @typedef {Object} Message
     * @param {string} messageID - message id , eg:60895dd62d1a706830c31f10
     * @returns {Message} message information 
     */
    this.getMessage = async function(messageID){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/message/'+messageID) // make the GET request
        return reponse.data;// return data JSON  

    };

    /**
     * 
     * @typedef {Object} Message
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @returns {array} message information
     */
    this.getAllMessagesInRoom = async function(roomID){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/message?roomid='+roomID) // make the GET request
        return reponse.data;// return data JSON 
    };

    /**
     * 
     * @typedef {Object} Message
     * @param {string} authorID - author id , eg:60895dd62d1a706830c31f10
     * @param {string} messageContent - message content , eg:my message content
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @returns {Message} message information, eg: author : 60895dd62d1a706830c31f10 , content : hello world , roomId : 60895dd56d1a706830c31f16 
     */
    this.createMessage = async function(authorID,messageContent,roomID){
        const reponse = await axios.post(apiUrl+'/message', { author : authorID , content : messageContent , roomId : roomID });
        return reponse.data;
    };

    /**
     * 
     * @typedef {Object} Message
     * @param {string} messageID - message id , eg:60895dd62d1a706830c31f10
     * @param {string} messageContent - message content , eg:my message content 
     * @returns {string} message id
     */
    this.updateMessage = async function(messageID,messageAuthor,messageContent,roomID){
        const reponse = await axios.put(apiUrl+'/message/'+messageID, { author: messageAuthor , content: messageContent , roomId : roomID });
        return reponse.data;
    };

    /**
     * 
     * @typedef {Object} Message
     * @param {string} messageID - message id , eg:60895dd62d1a706830c31f10
     */
    this.deleteMessage = async function(messageID){
        const reponse = await axios.delete(apiUrl+'/message/'+messageID);
    };
};
