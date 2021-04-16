import uuid
import json
from flask import Response
from flask_restful import Resource, abort, request
from scratchy_server.model.roomModel import RoomModel
import bson


class RoomsRes(Resource):
    def get(self):
        try:
            return Response(RoomModel.objects().to_json(), mimetype="application/json", status=200)
        except IndexError as ie:
            abort(404)

class RoomRes(Resource):
    def get(self, roomId):
        #if not roomId in database["rooms"]:
        #    abort(404)
        try:
            return Response(RoomModel.objects.get(id=roomId).to_json(), mimetype="application/json", status=200)
        except IndexError as ie:
            abort(404)
        # RoomModel.objects.get(id='4f4381f4e779897a2c000009')
        # RoomModel.objects.get(id=bson.objectid.ObjectId('4f4381f4e779897a2c000009'))

    def post(self):
        roomData = request.get_json()
        room = RoomModel()
        # room.id = uuid.uuid4().hex
        room.title = roomData['title'] if 'title' in roomData else "Default title"
        room.description = roomData['description'] if 'description' in roomData else "Default description"

        # database['rooms'][room.id] = room
        room = room.save()
        return { 'id': str(room.id)}

    def delete(self, roomId):
        try:
            RoomModel.objects.get(id=roomId).delete()
            return {'success':True}
        except IndexError as ie:
            abort(404)

##        if not roomId in database["rooms"]:
##            abort(404)
#        if roomId in database["rooms"]:
#            del database["rooms"][roomId]