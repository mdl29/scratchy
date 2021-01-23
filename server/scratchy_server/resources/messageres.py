import uuid
import time
from flask_restful import Resource, abort, request
from scratchy_server.model.messageModel import MessageModel
from scratchy_server.database import database

class MessageRes(Resource):
    def get(self, messageId):
        if not messageId in database["messages"]:
            abort(404)

        return database["messages"][messageId].__dict__

    def post(self):
        messageData = request.get_json()
        message = MessageModel()
        message.id = uuid.uuid4().hex
        message.content = messageData['content'] if 'content' in messageData else ""
        message.author = messageData['author'] if 'author' in messageData else "Unknown author"
        message.roomId = messageData['roomId'] if 'roomId' in messageData else "0"
        message.timestamp = time.time()

        database['messages'][message.id] = message
        return message.__dict__

    def delete(self, messageId):
        if not messageId in database["messages"]:
            abort(404)

        if messageId in database["messages"]:
            del database["messages"][messageId]
