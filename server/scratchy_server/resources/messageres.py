from flask import make_response
from flask_apispec import marshal_with, use_kwargs, doc
from flask_apispec.views import MethodResource
from marshmallow import fields

from scratchy_server.model.messageModel import MessageModel, MessageSchema, AllMessageSchema


@doc(tags=['Message'])
@marshal_with(MessageSchema)
class MessageRes(MethodResource):

    def get(self, messageId):
        return MessageModel.objects().get_or_404(id=messageId)

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
@marshal_with(AllMessageSchema)
class NoIdMessageRes(MethodResource):

# HTTP GET /api/message?roomId=unevaleur
    @use_kwargs({"roomId": fields.String()}, location="query")
    def get(self, roomId):
        # print(roomId)
        return {"messages": MessageModel.objects().filter(roomId=roomId)}

    @marshal_with(MessageSchema)
    @use_kwargs(MessageSchema)
    def post(self, **kwargs):
        message = MessageModel(**kwargs)
        message.save()
        return message
