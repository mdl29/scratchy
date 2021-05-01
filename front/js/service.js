/**
 * Create a scratchy service.
 * @constructor
 * @param {string} apiUrl - Scratchy service API URL, eg: "http://localhost:5000"
 * @param {string} roomID - room id , eg:60895dd62d1a706830c31f10
 */
function ScratchyService(apiUrl) {
    let _this = this;
    this.cacheUsers = []; // List of users, used as cache

    // ROOM 

    this.fetchRooms = function(){
        console.debug("ScratchyService.fetchRooms()");
        console.info(_this.cacheUsers);
        return [];
    };
//                               ROOM FUNCTIONS

    this.updateRoom = async function(roomId,roomTitle,roomDescription){
        const reponse = await axios.put(apiUrl+'/room/'+roomId, { title: roomTitle , description: roomDescription });
        return reponse.data;
    };

    this.createRoom = async function(roomTitle,roomDescription){
        const reponse = await axios.post(apiUrl+'/room', { title: roomTitle , description: roomDescription });
        return reponse.data;
    };

    this.deleteRoom = async function(roomId){

        const reponse = await axios.delete('http://localhost:5000/api/room/'+roomId);
        return reponse.data;
    };

    this.getAllRooms = async function(){ // put the id between "" 

        let reponse = await axios.get(apiUrl+'/room'); // make the GET request;
        // api.getAllRooms().then( (data) => console.log(data));
        return reponse.data;
    };

    this.getRoom = async function(roomID){ // put the id between "" 
            // Make a request for a user with a given ID
            let reponse = await axios.get(apiUrl+'/room/'+roomID);// make the GET request
            // api.getRoom().then( (data) => console.log(data));
            return reponse.data;// return data JSON           
    };

//                               USER FUNCTIONS

    this.getUserByPseudo = async function(userPseudo){ // put the id between "" 
        // Make a request for a user with a given ID
        // api.getUserByPseudo().then( (data) => console.log(data));
        let reponse = await axios.get(apiUrl+'/user?pseudo='+userPseudo);// make the GET request
        return reponse.data;// return data JSON         
    };

    this.getUserByid = async function(userId){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/user/'+userId) // make the GET request
        // api.getUserById().then( (data) => console.log(data));
        return reponse.data;// return data JSON          
    };

    this.createUser = async function(userPseudo,userProfileImage){
        const reponse = await axios.post(apiUrl+'/user', { pseudo: userPseudo , profileImage: userProfileImage });
        return reponse.data;
    };

    this.deleteUser = async function(userId){
        const reponse = await axios.delete('http://localhost:5000/api/user/'+userId);
        return reponse.data;
    };

    this.updateUser = async function(userId,userPseudo,userProfileImage){
        const reponse = await axios.put(apiUrl+'/user/'+userId, { pseudo: userPseudo, profileImage : userProfileImage });
        return reponse.data;
    };


//                               MESSAGE FUNCTIONS

    this.getMessage = async function(messageId){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/message/'+messageId) // make the GET request
        return reponse.data;// return data JSON  

    };
    this.getAllMessagesInRoom = async function(roomID){ // put the id between "" 
        // Make a request for a user with a given ID
        let reponse = await axios.get(apiUrl+'/message?roomid='+roomID) // make the GET request
        return reponse.data;// return data JSON 
    };
    this.createMessage = async function(authorId,messageContent,roomid){
        const reponse = await axios.post(apiUrl+'/user', { author : authorId , content : messageContent , roomId : roomid });
        return reponse.data;
    };
};

var api = new ScratchyService("http://localhost:5000/api");
api;
// api.getAllRooms().then( (data) => console.log('Resultat getAllRooms', data));
// console.log("toto");
// api.getRooms().then( function(data){ console.log(data); });
//             console.log(Response["title"]);