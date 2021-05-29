import datetime
import marshmallow as ma

from scratchy_server import db_scratchy
from scratchy_server.model.objectIdSchema import ObjectIdSchema


class MessageModel(db_scratchy.Document):
    content = db_scratchy.StringField(required=True)
    author = db_scratchy.ObjectIdField(required=True)
    timestamp = db_scratchy.DateTimeField(default=datetime.datetime.utcnow)
    roomId = db_scratchy.ObjectIdField(required=True)


class MessageSchema(ma.Schema):
    id = ObjectIdSchema()
    content = ma.fields.Str(required=True)
    author = ObjectIdSchema(required=True)
    roomId = ObjectIdSchema(required=True)
    # timestamp is unuse for now
    # because date seem not compatible with marshmallow datetime
    # it will be added with marshallow mongo update


class AllMessageSchema(ma.Schema):
    messages = ma.fields.List(ma.fields.Nested(MessageSchema))
