import json
from flask import Response
from flask_restful import Resource, abort, request
from scratchy_server.model.messageModel import MessageModel
import bson
import logging
from flask_restful import Api
from flask_restful_swagger import swagger

app = Flask(__name__)

###################################
# Wrap the Api with swagger.docs. It is a thin wrapper around the Api class that adds some swagger smarts
api = swagger.docs(Api(app), apiVersion='0.1')
###################################


class MessageRes(Resource):

	@swagger.operation(
        notes='the message res swagger',
        responseClass=ModelClass.__name__,
        nickname='upload',
        parameters=[
            {
              "name": "body",
              "description": "the message res",
              "required": True,
              "allowMultiple": False,
              "dataType": ModelClass2.__name__,
              "paramType": "body"
            }
          ],
        responseMessages=[
            {
              "code": 201,
              "message": "Created. The URL of the created blueprint should be in the Location header"
            },
            {
              "code": 405,
              "message": "Invalid input"
            }
          ]
    	)
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

    def post(self):
        messageData = request.get_json()
        message = MessageModel()
        message.content = messageData['content'] if 'content' in messageData else ""
        message.author = bson.objectid.ObjectId(messageData['author'])
        message.roomId = bson.objectid.ObjectId(messageData['roomId'])

        message = message.save()
        logging.debug("message: '%s' has been post", message.content)
        return {'id': str(message.id)}

    def put(self, messageId):
        messageData = request.get_json()
        MessageModel.objects.get(id=messageId).update(**messageData)
        logging.debug("the message has been updated")
        return {'id': messageId}

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
