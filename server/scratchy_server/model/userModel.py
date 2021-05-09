from scratchy_server import db_scratchy
import marshmallow as ma
from scratchy_server.model.objectIdSchema import ObjectIdSchema


class UserModel(db_scratchy.Document):
    pseudo = db_scratchy.StringField(unique=True, required=True)
    profileImage = db_scratchy.StringField(required=True)
    rooms = db_scratchy.ListField(db_scratchy.ObjectIdField())


class UserSchema(ma.Schema):
    id = ObjectIdSchema()
    pseudo = ma.fields.Str(required=True)
    profileImage = ma.fields.Str(required=True)
    rooms = ma.fields.List(ma.fields.Str())
