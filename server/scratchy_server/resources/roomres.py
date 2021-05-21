from flask_apispec.views import MethodResource
from flask_apispec import marshal_with, use_kwargs, doc
from scratchy_server.model.roomModel import RoomModel, RoomSchema, AllRoomSchema
from scratchy_server.resources import func


@doc(tags=['Room'])
@marshal_with(RoomSchema)
class RoomRes(MethodResource):

    def get(self, roomId):
        return func.get(RoomModel, roomId)

    @use_kwargs(RoomSchema)
    def put(self, roomId, **kwargs):
        room = func.get(RoomModel, roomId)
        room.modify(**kwargs)
        return room

    def delete(self, roomId):
        func.get(RoomModel, roomId).delete()
        return None


class AllRoomRes(MethodResource):

    @doc(tags=['AllRoom'])
    @marshal_with(AllRoomSchema)
    def get(self):
        return {"rooms": RoomModel.objects()}

    @doc(tags=['Room'])
    @marshal_with(RoomSchema)
    @use_kwargs(RoomSchema)
    def post(self, **kwargs):
        room = RoomModel(**kwargs)
        room.save()
        return room
