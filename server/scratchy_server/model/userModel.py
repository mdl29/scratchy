from scratchy_server import db_scratchy
import marshmallow as ma
from scratchy_server.model.objectIdSchema import ObjectIdSchema


class UserModel(db_scratchy.Document):
    pseudo = db_scratchy.StringField(unique=True)
    profileImage = db_scratchy.StringField()
    rooms = db_scratchy.ListField(db_scratchy.ObjectIdField())


class UserSchema(ma.Schema):
    id = ObjectIdSchema()
    pseudo = ma.fields.Str()
    profileImage = ma.fields.Str()
    rooms = ma.fields.List(ObjectIdSchema())
