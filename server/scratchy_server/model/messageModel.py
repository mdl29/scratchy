from scratchy_server import db_scratchy
import datetime
import marshmallow as ma
from scratchy_server.model.objectIdSchema import ObjectIdSchema


class MessageModel(db_scratchy.Document):
    content = db_scratchy.StringField(required=True)
    author = db_scratchy.ObjectIdField(required=True)
    timestamp = db_scratchy.DateTimeField(default=datetime.datetime.utcnow)
    roomId = db_scratchy.ObjectIdField(required=True)


class MessageSchema(ma.Schema):
    id = ObjectIdSchema()
    content = ma.fields.Str(required=True)
    author = ma.fields.Str(required=True)
    roomId = ma.fields.Str(required=True)
    # timestamp is unuse for now
    # because date seem not compatible with marshmallow datetime
    # it will be added with marshallow mongo update
