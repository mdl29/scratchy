from flask import Flask
from model.room import RoomModel
import uuid

from flask_restful import Resource, Api, abort, request

app = Flask(__name__)
api = Api(app)

database = {
    "rooms": {

    }
}

# data set
roomExemple = RoomModel()
roomExemple.id = "0"
roomExemple.title = "Mon premier salon"
roomExemple.description = "Salon de test"

database["rooms"]["0"] = roomExemple

# Resources
class RoomRes(Resource):
    def get(self, roomId):
        if not roomId in database["rooms"]:
            abort(404)
        return database["rooms"][roomId].__dict__

    def post(self):
        roomData = request.get_json()
        room = RoomModel()
        room.id = str(uuid.uuid4())
        room.title == roomData['title'] if 'title' in roomData else "Default title"
        room.description = roomData['description'] if 'description' in roomData else "Default description"
        database["rooms"][room.id] = room
        return room.__dict__

    def delete(self, roomId):
        if not roomId in database["rooms"]:
            abort(404)
        del database["rooms"][roomId]

api.add_resource(RoomRes, '/api/room', '/api/room/<string:roomId>')