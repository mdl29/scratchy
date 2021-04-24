import json
from flask import Response
from flask_restful import Resource, abort, request
from scratchy_server.model.roomModel import RoomModel
import logging


class RoomRes(Resource):

    def get(self, roomId=None):
        if roomId is None:
            try:
                response = Response(RoomModel.objects().to_json(), mimetype="application/json", status=200)
            except IndexError:
                abort(404)
            else:
                if logging.getLogger().isEnabledFor(logging.DEBUG):
                    logging.debug("here are the rooms:\n%s", "\n".join(map(lambda x: x["title"], json.loads(response.get_data()))))
                return response

        else:
            try:
                response = Response(RoomModel.objects.get(id=roomId).to_json(), mimetype="application/json", status=200)
            except IndexError:
                abort(404)
            else:
                logging.debug("here is the room: %s", json.loads(response.get_data())["title"])
                return response

    def post(self):
        roomData = request.get_json()
        room = RoomModel()
        # room.id = uuid.uuid4().hex
        room.title = roomData['title'] if 'title' in roomData else "Default title"
        room.description = roomData['description'] if 'description' in roomData else "Default description"

        # database['rooms'][room.id] = room
        room = room.save()
        logging.debug("created the room: %s", room.title)
        return {'id': str(room.id)}

    def delete(self, roomId):
        try:
            response = RoomModel.objects.get(id=roomId)
        except IndexError:
            abort(404)
        else:
            logging.debug("currently deleting the room: %s", json.loads(response.to_json())["title"])
            try:
                response.delete()
            except Exception:
                return {'success': False}
            logging.debug("done, %s has been deleted", json.loads(response.to_json())["title"])
            return {'success': True}
