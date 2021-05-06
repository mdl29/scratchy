from flask_apispec.views import MethodResource
from flask_apispec import marshal_with, use_kwargs, doc
from scratchy_server.model.roomModel import RoomModel, RoomSchema


@doc(tags=['Room'])
@marshal_with(RoomSchema)
class RoomRes(MethodResource):

    def get(self, roomId):
        return RoomModel.objects().get_or_404(id=roomId)

    @use_kwargs(RoomSchema)
    def put(self, roomId, **kwargs):
        room = RoomModel.objects().get_or_404(id=roomId)
        room.modify(**kwargs)
        return room

    def delete(self, roomId):
        RoomModel.objects().get_or_404(id=roomId).delete()
        return None


class NoIdRoomRes(MethodResource):

    @doc(tags=['Room'])
    @marshal_with(RoomSchema)
    @use_kwargs(RoomSchema)
    def post(self, **kwargs):
        room = RoomModel(**kwargs)
        room.save()
        return room
