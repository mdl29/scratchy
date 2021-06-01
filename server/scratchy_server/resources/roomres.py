from flask import make_response
from flask_apispec import marshal_with, use_kwargs, doc
from flask_apispec.views import MethodResource

from scratchy_server.model.roomModel import RoomModel, RoomSchema, AllRoomSchema
from scratchy_server.filters.mongoexception import validation


@doc(tags=['Room'])
class RoomRes(MethodResource):
    decorators = [validation]

    @marshal_with(RoomSchema, code=200)
    def get(self, roomId):
        return RoomModel.objects().get_or_404(id=roomId)

    @marshal_with(RoomSchema, code=200)
    @use_kwargs(RoomSchema)
    def put(self, roomId, **kwargs):
        room = RoomModel.objects().get_or_404(id=roomId)
        room.modify(**kwargs)
        return room

    @marshal_with(None, code=204)
    def delete(self, roomId):
        RoomModel.objects().get_or_404(id=roomId).delete()
        return make_response('', 204)


class AllRoomRes(MethodResource):

    @doc(tags=['AllRoom'])
    @marshal_with(AllRoomSchema, code=200)
    def get(self):
        return {"rooms": RoomModel.objects()}

    @doc(tags=['Room'])
    @marshal_with(RoomSchema, code=201)
    @use_kwargs(RoomSchema)
    def post(self, **kwargs):
        room = RoomModel(**kwargs)
        room.save()
        return room, 201
