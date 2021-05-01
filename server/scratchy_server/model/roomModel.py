from scratchy_server import db_scratchy
import marshmallow as ma
from scratchy_server.model.objectId import ObjectId


class RoomModel(db_scratchy.Document):
    description = db_scratchy.StringField()
    title = db_scratchy.StringField()
    users = db_scratchy.ListField(db_scratchy.ObjectIdField())


class RoomSchema(ma.Schema):
    id = ObjectId()
    description = ma.fields.Str()
    title = ma.fields.Str()
    users = ma.fields.List(ObjectId())
