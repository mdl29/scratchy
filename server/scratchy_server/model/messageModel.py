from scratchy_server import db_scratchy
import datetime

class MessageModel(db_scratchy.Document):
    content = db_scratchy.StringField()
    author = db_scratchy.StringField()
    timestamp = db_scratchy.DateTimeField(default=datetime.datetime.utcnow)
    roomId= db_scratchy.ObjectIdField()
