from flask import make_response
from flask_socketio import Namespace
from flask_apispec import marshal_with, use_kwargs, doc
from flask_apispec.views import MethodResource
from marshmallow import fields

from scratchy_server.model.roomModel import RoomModel, RoomSchema, AllRoomSchema
from scratchy_server.filters.mongoexception import validation


@doc(tags=['Room'])
class RoomRes(MethodResource, Namespace):
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

    def on_get(self, *args, **kwargs):
        self.get(*args, **kwargs)


@doc(tags=['Room'])
class AllRoomRes(MethodResource):
    decorators = [validation]

    @marshal_with(AllRoomSchema, code=200)
    @use_kwargs({"userId": fields.String()}, location="query")
    def get(self, userId=None):
        if not userId is None: # Search room by containing a specific userid
            return {"rooms": RoomModel.objects(users= userId)}
        
        return {"rooms": RoomModel.objects()}

    @marshal_with(RoomSchema, code=201)
    @use_kwargs(RoomSchema)
    def post(self, **kwargs):
        room = RoomModel(**kwargs)
        room.save()
        return room, 201

    @marshal_with(AllRoomSchema, code=204)
    def delete(self):
        RoomModel.objects().delete()
        return make_response('', 204)
