import uuid
import time
from flask import Response
from flask_restful import Resource, abort, request
from scratchy_server.model.messageModel import MessageModel
import bson

class MessageRes(Resource):
    def get(self, messageId=None):
        print("message Id is ", messageId)
        if messageId is None:
            # check parameter (search roomid)
            roomId = request.args.get('roomid')
            if roomId:
                try:
                    return Response(MessageModel.objects.filter(roomId=roomId).to_json(), mimetype="application/json", status=200)
                except MessageModel.DoesNotExist as ie:
                    abort(404)
        else:
            try:
                return Response(MessageModel.objects.get(id=messageId).to_json(), mimetype="application/json", status=200)
            except MessageModel.DoesNotExist as ie:
                abort(404)

    def post(self):
        messageData = request.get_json()
        message = MessageModel()
        message.content = messageData['content'] if 'content' in messageData else ""
        message.author = bson.objectid.ObjectId(messageData['author'])
        message.roomId = bson.objectid.ObjectId(messageData['roomId'])

        message = message.save()        
        return {'id': str(message.id)}

    def delete(self, messageId):
        try:
            MessageModel.objects.get(id=messageId).delete()
            return {'success':True}
        except MessageModel.DoesNotExist as ie:
            abort(404)
