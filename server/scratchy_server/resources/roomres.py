import uuid
import json
from flask import Response
from flask_restful import Resource, abort, request
from scratchy_server.model.roomModel import RoomModel
import bson
import logging

class RoomRes(Resource):

    def get(self, roomId=None):
        if roomId is None:
            try:
                return Response(RoomModel.objects().to_json(), mimetype="application/json", status=200)
            except IndexError as ie:
                abort(404)
        else:        
            try:
                response = Response(RoomModel.objects.get(id=roomId).to_json(), mimetype="application/json", status=200)
            except IndexError as ie:
                abort(404)
            else:
                logging.debug("here is %s",json.loads(response.get_data())["title"])
                return response

    def post(self):
        roomData = request.get_json()
        room = RoomModel()
        # room.id = uuid.uuid4().hex
        room.title = roomData['title'] if 'title' in roomData else "Default title"
        room.description = roomData['description'] if 'description' in roomData else "Default description"

        # database['rooms'][room.id] = room
        room = room.save()
        logging.debug("created %s",room.title)
        return { 'id': str(room.id)}

    def delete(self, roomId):
        try:
            response = RoomModel.objects.get(id=roomId)
        except IndexError as ie:
            abort(404)
        else:
            logging.debug("currently deleting %s",json.loads(response.to_json())["title"])
            try:
                response.delete()
            except:
                return {'success':False}
            logging.debug("done, %s has been deleted",json.loads(response.to_json())["title"])
            return {'success':True}
