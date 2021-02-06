
from pymongo import MongoClient
from bson.objectid import ObjectId

from scratchy_server.model.roomModel import RoomModel

# version données dans MongoDB
# avec notre instance de MongoDB dans docker-compose (avec mot de passe)
dbClient = MongoClient('mongodb://root:example@localhost:27017/')

# créer notre database (ou lire la database existante)
db_scratchy = dbClient.scratchy

## création de notre collection Room (ou accès à notre collection Room existante)
room_collection = db_scratchy.room

def insert_room(room_model): ## DAO: Data Access Object
    ## mapping entre les modèles
    room_json = {} ## DTO: Data Transfer Object
    room_json["title"] = room_model.title
    room_json["description"] = room_model.description
    result = room_collection.insert_one(room_json)
    room_model.id = str(result.inserted_id)
    return room_model

def get_room(room_id):
    ## mapping entre les modèles
    result_json = room_collection.find_one({"_id": ObjectId(room_id)})
    if result_json:
        room_model = RoomModel()
        room_model.id = str(result_json["_id"])
        room_model.title = result_json["title"]
        room_model.description = result_json["description"]
        return room_model
    else:
        raise IndexError("Id not found")

def delete_room(room_id):
    ## mapping entre les modèles
    result_json = room_collection.delete_one({"_id": ObjectId(room_id)})
    if result_json.deleted_count == 1:
        return "ok"
    else:
        raise IndexError("Id not found")

# données en mémoire
database = {
    "rooms": {
    },
    "users": {
    },
    "messages": {
    }
}
