import uuid
import time 
from flask_restful import Resource, abort, request
from scratchy_server.model.messageModel import MessageModel
from scratchy_server.database import database

class MessageRes(Resource):
    def get(self,messageId):
        if not messageId in database["message"]:
            abort(404)

        return database["message"][messageId].__dict__

    def post(self):
        messageData = request.get_json()
        message = MessageModel()
        message.content = messageData['content'] if 'content' in messageData else "Default content"
        message.author = messageData['author'] if 'author' in messageData else "unknow"
        message.timestamp = messageData['timestamp'] if 'timestamp' in messageData else time.time()
        message.roomId = messageData['roomId'] if 'roomId' in messageData else abort(400)
        message.id = uuid.uuid4().hex
        

        database['message'][message.id] = message
        return message.__dict__

    def delete(self, messageId):
        if not messageId in database["message"]:
            abort(404)

        if messageId in database["message"]:
            del database["message"][messageId]