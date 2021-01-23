import uuid
from flask_restful import Resource, abort, request
from scratchy_server.model.roomModel import RoomModel
from scratchy_server.database import database

class RoomRes(Resource):
    def get(self, roomId):
        if not roomId in database["rooms"]:
            abort(404)

        return database["rooms"][roomId].__dict__

    def post(self):
        roomData = request.get_json()
        room = RoomModel()
        room.id = uuid.uuid4().hex
        room.title = roomData['title'] if 'title' in roomData else "Default title"
        room.description = roomData['description'] if 'description' in roomData else "Default description"

        database['rooms'][room.id] = room
        return room.__dict__

    def delete(self, roomId):
        if not roomId in database["rooms"]:
            abort(404)

        if roomId in database["rooms"]:
            del database["rooms"][roomId]