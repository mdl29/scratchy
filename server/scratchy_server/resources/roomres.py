import uuid
import json
from flask import Response
from flask_restful import Resource, abort, request
from scratchy_server.model.roomModel import RoomModel
import bson

class RoomRes(Resource):

    def get(self, roomId=None):
        if roomId is None:
            try:
                return Response(RoomModel.objects().to_json(), mimetype="application/json", status=200)
            except IndexError as ie:
                abort(404)
        else:        
            try:
                return Response(RoomModel.objects.get(id=roomId).to_json(), mimetype="application/json", status=200)
            except IndexError as ie:
                abort(404)

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