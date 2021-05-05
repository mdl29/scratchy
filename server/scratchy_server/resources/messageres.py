from scratchy_server.model.messageModel import MessageModel, MessageSchema
from flask_apispec.views import MethodResource
from flask_apispec import marshal_with, use_kwargs, doc


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

    def delete(self, messageId):
        MessageModel.objects().get_or_404(id=messageId).delete()
        return None


class AllMessageRes(MethodResource):

    @doc(tags=['Message'])
    @marshal_with(MessageSchema)
    @use_kwargs(MessageSchema)
    def post(self, **kwargs):
        message = MessageModel(**kwargs)
        message.save()
        return message
