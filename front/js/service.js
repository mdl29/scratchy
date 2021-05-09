/*
!- add axios cdn link in index.html -!
     	<scritp src="https://unpkg.com/axios@0.21.1/dist/axios.min.js"></scritp>
- start scratchy service : 
    var api = new ScratchyService("http://localhost:5000/api");
- call a function :
    api.function();|
*/
/**
 * Scratchy service variable doc :
 * @constructor
 * @param {string} apiUrl - Scratchy service API URL, eg: "http://localhost:5000"
 * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
 * @param {string} roomTitle - title of a room , eg:my room
 * @param {string} roomDescription - description of a room, eg:my room description
 * @param {string} userPseudo - pseudo of a user , eg:toto
 * @param {string} userID - user id , eg:60895dd62d1a706830c31f10
 * @param {string} userProfileImage - profile image link , eg:https://myprofileimage.test/picture.png
 * @param {string} messageID - message id , eg:60895dd62d1a706830c31f10
 * @param {string} messageContent - message content , eg: my message content
 */

 function ScratchyService(apiUrl) {
    let _this = this;
    this.cacheUsers = []; // List of users, used as cache

//                               ROOM FUNCTIONS

    this.updateRoom = async function(roomId,roomTitle,roomDescription){
        const reponse = await axios.put(apiUrl+'/room/'+roomId, { title: roomTitle , description: roomDescription });
        return reponse.data;
    };

    this.createRoom = async function(roomTitle,roomDescription){
        const reponse = await axios.post(apiUrl+'/room', { title: roomTitle , description: roomDescription });
        return reponse.data;
    };

    this.deleteRoom = async function(roomID){
        const reponse = await axios.delete(apiUrl+'/room/'+roomID);
        return reponse.data;
    };

    this.getAllRooms = async function(){ // put the id between "" 
        let reponse = await axios.get(apiUrl+'/room'); // make the GET request;
        return reponse.data;
    };

    this.getRoom = async function(roomID){ // put the id between "" 
            // Make a request for a user with a given ID
            let reponse = await axios.get(apiUrl+'/room/'+roomID);// make the GET request
            return reponse.data;// return data JSON           
    };

//                               USER FUNCTIONS

    this.getUserByPseudo = async function(userPseudo){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/user?pseudo='+userPseudo);// make the GET request
        return reponse.data;// return data JSON         
    };

    this.getUserByid = async function(userID){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/user/'+userID) // make the GET request
        return reponse.data;// return data JSON          
    };

    this.createUser = async function(userPseudo,userProfileImage){
        const reponse = await axios.post(apiUrl+'/user', { pseudo: userPseudo , profileImage: userProfileImage });
        return reponse.data;
    };

    this.deleteUser = async function(userID){
        // 
        const reponse = await axios.delete('http://localhost:5000/api/user/'+userID);
        return reponse.data;
    };

    this.updateUser = async function(userID,userPseudo){
        const reponse = await axios.put(apiUrl+'/user/'+userID, { pseudo: userPseudo});
        return reponse.data;
    };


//                               MESSAGE FUNCTIONS

    this.getMessage = async function(messageID){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/message/'+messageID) // make the GET request
        return reponse.data;// return data JSON  

    };
    this.getAllMessagesInRoom = async function(roomID){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/message?roomid='+roomID) // make the GET request
        return reponse.data;// return data JSON 
    };
    this.createMessage = async function(authorID,messageContent,roomID){
        const reponse = await axios.post(apiUrl+'/message', { author : authorID , content : messageContent , roomId : roomID });
        return reponse.data;
    };
    this.updateMessage = async function(messageID,messageContent){
        const reponse = await axios.put(apiUrl+'/message/'+messageID, { content: messageContent });
        return reponse.data;
    };
    this.deleteMessage = async function(messageID){
        const reponse = await axios.delete(apiUrl+'/message/'+messageID);
        return reponse.data;
    };
};
