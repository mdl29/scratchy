from scratchy_server.model.messageModel import MessageModel, MessageSchema
from flask_apispec.views import MethodResource
from flask_apispec import marshal_with, use_kwargs, doc
from marshmallow import fields
from flask_restful import request
from scratchy_server.filters.mongoexception import validation

@doc(tags=['Message'])
@marshal_with(MessageSchema)
class MessageRes(MethodResource):
    decorators = [validation]

    @use_kwargs({"roomId": fields.String()}, location="query")
    def get(self, messageId=None, roomId=None):
        print(roomId, messageId)
        if messageId != None:
            return MessageModel.objects().get_or_404(id=messageId)
        else:
            return MessageModel.objects().filter(roomId=roomId) # doesn't work here but it doesn't worked before need to open an issue

    @use_kwargs(MessageSchema)
    def put(self, messageId, **kwargs):
        message = MessageModel.objects().get_or_404(id=messageId)
        message.modify(**kwargs)
        return message

    def delete(self, messageId):
        MessageModel.objects().get_or_404(id=messageId).delete()
        return None


class NoIdMessageRes(MethodResource):

    @doc(tags=['Message'])
    @marshal_with(MessageSchema)
    @use_kwargs(MessageSchema)
    def post(self, **kwargs):
        message = MessageModel(**kwargs)
        message.save()
        return message
