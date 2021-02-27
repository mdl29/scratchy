import uuid
import time
from flask_restful import Resource, abort, request
from scratchy_server.model.messageModel import MessageModel
from scratchy_server.database import database
import bson

class MessageRes(Resource):
    def get(self, messageId):
        try:
            return MessageModel.objects.get(id=messageId).to_json()
        except IndexError as ie:
            abort(404)
    def post(self):
        messageData = request.get_json()
        message = MessageModel()
        message.content = messageData['content'] if 'content' in messageData else ""
        message.author = bson.objectid.ObjectId(messageData['author'])
        message.messageId = bson.objectid.ObjectId(messageData['roomId'])

        message = message.save()        
        return {'id': str(message.id)}

    def delete(self, messageId):
        try:
            RoomModel.objects.get(id=messageId).delete()
            return {'success':True}
        except IndexError as ie:
            abort(404)
