from scratchy_server import db_scratchy
import datetime
import marshmallow as ma
from scratchy_server.model.objectIdSchema import ObjectIdSchema


class MessageModel(db_scratchy.Document):
    content = db_scratchy.StringField()
    author = db_scratchy.ObjectIdField()
    timestamp = db_scratchy.DateTimeField(default=datetime.datetime.utcnow)
    roomId = db_scratchy.ObjectIdField()


class MessageSchema(ma.Schema):
    id = ObjectIdSchema()
    content = ma.fields.Str()
    author = ma.fields.Str()
    roomId = ma.fields.Str()
