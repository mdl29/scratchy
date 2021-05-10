/*
- add axios cdn link in index.html
     	<scritp src="https://unpkg.com/axios@0.21.1/dist/axios.min.js"></scritp>
- start scratchy service : 
    var api = new ScratchyService("http://localhost:5000/api");
    api;
- call a function :
    api.function();|
*/


/**
 * @constructor
 * @param {string} apiUrl - Scratchy service API URL, eg: "http://localhost:5000"
 */
 function ScratchyService(apiUrl) {
    let _this = this;
    this.cacheUsers = []; // List of users, used as cache

//                               ROOM FUNCTIONS
    /**
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @param {string} roomTitle - title of a room , eg:my room
     * @param {string} roomDescription - description of a room, eg:my room description
     * @returns {string} - room id
     */
    this.updateRoom = async function(roomId,roomTitle,roomDescription){
        const reponse = await axios.put(apiUrl+'/room/'+roomId, { title: roomTitle , description: roomDescription });
        return reponse.data;
    };

    /**
     * 
     * @param {string} roomTitle - title of a room, eg:my room
     * @param {string} roomDescription - description of a room, eg:my room description
     * @returns {string} - room id 
     */
    this.createRoom = async function(roomTitle,roomDescription){
        const reponse = await axios.post(apiUrl+'/room', { title: roomTitle , description: roomDescription });
        return reponse.data;
    };

    /**
     * 
     * @param {string} roomID - room id , eg: 60895dd62d1a706830c31f10
     */
    this.deleteRoom = async function(roomID){
        const reponse = await axios.delete(apiUrl+'/room/'+roomID);
        return reponse.data;
    };
    /**
     * 
     * @returns {array} - all rooms information 
     */
    this.getAllRooms = async function(){ // put the id between "" 
        let reponse = await axios.get(apiUrl+'/room'); // make the GET request;
        return reponse.data;
    };

    /**
     * 
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @returns {JSON} room information , { oid:"60895dd62d1a706830c31f10" ,title:"example"}
     */
    this.getRoom = async function(roomID){ // put the id between "" 
            // Make a request for a user with a given ID
            let reponse = await axios.get(apiUrl+'/room/'+roomID);// make the GET request
            return reponse.data;// return data JSON           
    };

//                               USER FUNCTIONS
    
    /**
     * 
     * @param {string} userPseudo - a user pseudo , eg:toto
     * @returns {JSON} - user information 
     */
    this.getUserByPseudo = async function(userPseudo){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/user?pseudo='+userPseudo);// make the GET request
        return reponse.data;// return data JSON         
    };

    /**
     * 
     * @param {string} userID , user id , eg:60895dd62d1a706830c31f10
     * @returns {JSON} - user information
     */
    this.getUserByid = async function(userID){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/user/'+userID) // make the GET request
        return reponse.data;// return data JSON          
    };

    /**
     * 
     * @param {string} userPseudo - a user pseudo , eg:toto
     * @param {*} userProfileImage - profile image link , eg:https://myprofileimage.test/picture.png
     * @returns {string} - user id , eg: 60895dd62d1a706830c31f10
     */
    this.createUser = async function(userPseudo,userProfileImage){
        const reponse = await axios.post(apiUrl+'/user', { pseudo: userPseudo , profileImage: userProfileImage });
        return reponse.data;
    };

    /**
     * 
     * @param {string} userID - user id , eg:60895dd62d1a706830c31f10
     */
    this.deleteUser = async function(userID){
        // 
        const reponse = await axios.delete('http://localhost:5000/api/user/'+userID);
        return reponse.data;
    };

    /**
     * 
     * @param {string} userID - user id , eg:60895dd62d1a706830c31f10
     * @param {string} userPseudo - user pseudo , eg:toto
     * @returns {string} - user id , eg:60895dd62d1a706830c31f10
     */
    this.updateUser = async function(userID,userPseudo){
        const reponse = await axios.put(apiUrl+'/user/'+userID, { pseudo: userPseudo});
        return reponse.data;
    };

//                               MESSAGE FUNCTIONS

    /**
     * 
     * @param {string} messageID - message id , eg:60895dd62d1a706830c31f10
     * @returns {JSON} message information 
     */
    this.getMessage = async function(messageID){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/message/'+messageID) // make the GET request
        return reponse.data;// return data JSON  

    };

    /**
     * 
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
     * @param {string} authorID - author id , eg:60895dd62d1a706830c31f10
     * @param {string} messageContent - message content , eg:my message content
     * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
     * @returns {string} message id
     */
    this.createMessage = async function(authorID,messageContent,roomID){
        const reponse = await axios.post(apiUrl+'/message', { author : authorID , content : messageContent , roomId : roomID });
        return reponse.data;
    };

    /**
     * 
     * @param {string} messageID - message id , eg:60895dd62d1a706830c31f10
     * @param {string} messageContent - message content , eg:my message content 
     * @returns {string} message id
     */
    this.updateMessage = async function(messageID,messageContent){
        const reponse = await axios.put(apiUrl+'/message/'+messageID, { content: messageContent });
        return reponse.data;
    };

    /**
     * 
     * @param {string} messageID - message id , eg:60895dd62d1a706830c31f10
     */
    this.deleteMessage = async function(messageID){
        const reponse = await axios.delete(apiUrl+'/message/'+messageID);
        return reponse.data;
    };
};

var api = new ScratchyService("http://localhost:5000/api");
api;