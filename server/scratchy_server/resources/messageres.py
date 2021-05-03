from scratchy_server.model.messageModel import MessageModel, MessageSchema
import logging
from flask_apispec.views import MethodResource
from flask_apispec import marshal_with, use_kwargs


@marshal_with(MessageSchema)
class MessageRes(MethodResource):

    def get(self, messageId):
        return MessageModel.objects().get_or_404(id=messageId)

    @use_kwargs(MessageSchema)
    def post(self, **kwargs):
        message = MessageModel(**kwargs)
        message.save()
        return message

    @use_kwargs(MessageSchema)
    def put(self, messageId, **kwargs):
        message = MessageModel.objects().get_or_404(id=messageId)
        message.update(**kwargs)
        message = MessageModel.objects().get_or_404(id=messageId)
        return message

    def delete(self, messageId):
        MessageModel.objects().get_or_404(id=messageId).delete()
        return None
