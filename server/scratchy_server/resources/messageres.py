import json
from flask import Response
from flask_restful import Resource, abort, request
from flask_restful.reqparse import RequestParser
from scratchy_server.model.messageModel import MessageModel
import bson
import logging
from flask import Flask
from flask_restful_swagger_3 import Api
from flask_restful_swagger_3 import swagger, Resource, Schema

app = Flask(__name__)


api = Api(app, swagger_prefix_url = '/doc/api')


class MessageModel(Schema):
    type = 'object'
    properties = {
        "_id": {
            "type": '$oid'
            },
        "description":{
            "type": "string"
        },
        "title": {
            "type": "string"
        },
        "user": {
            "type": "list"
        },
    }


class MessageRes(Resource):

    post_parser = RequestParser()
    post_parser.add_argument('post', type=str, required=True)
    post_parser.add_argument('id', type=str)
    post_parser.add_argument('description', type=str)
    post_parser.add_argument('title', type=str)
    post_parser.add_argument('user', type=str)

    put_parser = RequestParser()
    put_parser.add_argument('put', type=str, required=True)
    put_parser.add_argument('id', type=str)
    put_parser.add_argument('description', type=str)
    put_parser.add_argument('title', type=str)
    put_parser.add_argument('user', type=str)

    @swagger.tags('Message')
    @swagger.reorder_with(MessageModel, description = "Returns a message")
    def get(self, messageId=None):
        print("message Id is ", messageId)
        if messageId is None:
            # check parameter (search roomid)
            roomId = request.args.get('roomid')
            if roomId:
                try:
                    response = Response(MessageModel.objects.filter(roomId=roomId).to_json(), mimetype="application/json", status=200)
                except MessageModel.DoesNotExist:
                    abort(404)
                else:
                    if logging.getLogger().isEnabledFor(logging.DEBUG):
                        logging.debug("here are the message:\n%s", "\n".join(map(lambda x: x["content"], json.loads(response.get_data()))))

                    return response
        else:
            try:
                response = Response(MessageModel.objects.get(id=messageId).to_json(), mimetype="application/json", status=200)
            except MessageModel.DoesNotExist:
                abort(404)
            else:
                logging.debug("here is the message: %s", json.loads(response.get_data())["content"])
                return response

    @swagger.tags('Message')
    @swagger.reorder_with(MessageModel, description = "Create a message")
    @swagger.reqparser(name = 'PostMessage', parser = post_parser)
    def post(self):
        messageData = request.get_json()
        message = MessageModel()
        message.content = messageData['content'] if 'content' in messageData else ""
        message.author = bson.objectid.ObjectId(messageData['author'])
        message.roomId = bson.objectid.ObjectId(messageData['roomId'])

        message = message.save()
        logging.debug("message: '%s' has been post", message.content)
        return {'id': str(message.id)}

    @swagger.tags('Message')
    @swagger.reorder_with(MessageModel, description = "change a message")
    @swagger.reqparser(name = 'PutMessage', parser = put_parser)
    def put(self, messageId):
        messageData = request.get_json()
        MessageModel.objects.get(id=messageId).update(**messageData)
        logging.debug("the message has been updated")
        return {'id': messageId}

    @swagger.tags('Message')
    @swagger.reorder_with(MessageModel, description = "delete a message")
    def delete(self, messageId):
        try:
            response = MessageModel.objects.get(id=messageId)
        except MessageModel.DoesNotExist:
            abort(404)
        else:
            logging.debug("currently deleting the message: %s", json.loads(response.to_json())["content"])
            try:
                response.delete()
            except Exception:
                return {'success': False}
            logging.debug("done, %s has been deleted", json.loads(response.to_json())["content"])
            return {'success': True}
