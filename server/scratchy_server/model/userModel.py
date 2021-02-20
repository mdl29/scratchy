from scratchy_server import db_scratchy

class UserModel(db_scratchy.Document):
    pseudo = db_scratchy.StringField()
    profilImage = db_scratchy.StringField()
    user = db_scratchy.StringField()
    roomsId = db_scratchy.ListField(db_scratchy.ObjectIdField())

    