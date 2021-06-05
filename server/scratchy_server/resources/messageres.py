from flask import make_response
from flask_apispec import marshal_with, use_kwargs, doc
from flask_apispec.views import MethodResource
from marshmallow import fields
from flask_restful import request

from scratchy_server.model.messageModel import MessageModel, MessageSchema, AllMessageSchema
from scratchy_server.filters.mongoexception import validation


@doc(tags=['Message'])
class MessageRes(MethodResource):
    decorators = [validation]

    @marshal_with(MessageSchema, code=200)
    def get(self, messageId):
        return MessageModel.objects().get_or_404(id=messageId)

    @marshal_with(MessageSchema, code=200)
    @use_kwargs(MessageSchema)
    def put(self, messageId, **kwargs):
        message = MessageModel.objects().get_or_404(id=messageId)
        message.modify(**kwargs)
        return message

    @marshal_with(None, code=204)
    def delete(self, messageId):
        MessageModel.objects().get_or_404(id=messageId).delete()
        return make_response('', 204)


@doc(tags=['Message'])
class AllMessageRes(MethodResource):

# HTTP GET /api/message?roomId=unevaleur
    @marshal_with(AllMessageSchema, code=200)
    @use_kwargs({"roomId": fields.String()}, location="query")
    def get(self, roomId):
        # print(roomId)
        return {"messages": MessageModel.objects().filter(roomId=roomId)}

    @marshal_with(MessageSchema, code=201)
    @use_kwargs(MessageSchema)
    def post(self, **kwargs):
        message = MessageModel(**kwargs)
        message.save()
        return message, 201
