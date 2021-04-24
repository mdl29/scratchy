from scratchy_server import db_scratchy


class RoomModel(db_scratchy.Document):
    description = db_scratchy.StringField()
    title = db_scratchy.StringField()
    users = db_scratchy.ListField(db_scratchy.ObjectIdField())
