import uuid
import json
from flask_restful import Resource, abort, request
from scratchy_server.model.roomModel import RoomModel

class RoomRes(Resource):
    def get(self, roomId):
        #if not roomId in database["rooms"]:
        #    abort(404)
        try:
            return get_room(roomId).__dict__
        except IndexError as ie:
            abort(404)

    def post(self):
        roomData = request.get_json()
        room = RoomModel()
        # room.id = uuid.uuid4().hex
        room.title = roomData['title'] if 'title' in roomData else "Default title"
        room.description = roomData['description'] if 'description' in roomData else "Default description"

        # database['rooms'][room.id] = room
        room.save()
        return room

    def delete(self, roomId):
        try:
            delete_room(roomId)
            return {'success':True}
        except IndexError as ie:
            abort(404)

##        if not roomId in database["rooms"]:
##            abort(404)
#        if roomId in database["rooms"]:
#            del database["rooms"][roomId]