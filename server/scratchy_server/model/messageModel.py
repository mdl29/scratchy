import datetime
import marshmallow as ma

from scratchy_server import db_scratchy
from scratchy_server.model.objectIdSchema import ObjectIdSchema
from marshmallow_mongoengine import ModelSchema


class MessageModel(db_scratchy.Document):
    content = db_scratchy.StringField(required=True)
    author = db_scratchy.ObjectIdField(required=True)
    timestamp = db_scratchy.DateTimeField(default=datetime.datetime.utcnow)
    roomId = db_scratchy.ObjectIdField(required=True)


class MessageSchema(ModelSchema):
    class Meta:
        model = MessageModel
        model_build_obj = False

class AllMessageSchema(ma.Schema):
    messages = ma.fields.List(ma.fields.Nested(MessageSchema))
