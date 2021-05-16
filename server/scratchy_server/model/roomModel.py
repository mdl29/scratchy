from scratchy_server import db_scratchy
import marshmallow as ma
from scratchy_server.model.objectIdSchema import ObjectIdSchema


class RoomModel(db_scratchy.Document):
    description = db_scratchy.StringField(required=True)
    title = db_scratchy.StringField(required=True)
    users = db_scratchy.ListField(db_scratchy.ObjectIdField())


class RoomSchema(ma.Schema):
    id = ObjectIdSchema()
    description = ma.fields.Str(required=True)
    title = ma.fields.Str(required=True)
    users = ma.fields.List(ma.fields.Str())

class AllRoomSchema(ma.Schema):
    rooms = ma.fields.List(ma.fields.Nested(RoomSchema))
