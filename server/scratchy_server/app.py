import uuid
from flask import Flask
from flask_restful import Resource, Api, abort, request
from scratchy_server.model.roomModel import RoomModel
from scratchy_server.resources.roomres import RoomRes
from scratchy_server.model.userModel import UserModel
from scratchy_server.resources.userres import UserRes
from scratchy_server.model.messageModel import MessageModel
from scratchy_server.resources.messageres import MessageRes
from scratchy_server import database

app = Flask(__name__)
api = Api(app)

# Data set
roomExemple = RoomModel()
roomExemple.id = "0"
roomExemple.title = "Mon premier salon"
roomExemple.description = "Salon de test"
userExemple = UserModel()
userExemple.id = "0"
userExemple.pseudo = "Your name"
userExemple.profileImage = "https://http.cat/204"
userExemple.roomsId = [0]
messageExemple = MessageModel()
messageExemple.id = "0"
messageExemple.author = "The author"
messageExemple.roomId = "0"
messageExemple.timestamp = 0

# database["rooms"]["0"] = roomExemple
# database["users"]["0"] = userExemple
# database["messages"]["0"] = messageExemple

api.add_resource(RoomRes, '/api/room', '/api/room/<string:roomId>')
api.add_resource(UserRes, '/api/user', '/api/user/<string:userId>')
api.add_resource(MessageRes, '/api/message', '/api/message/<string:messageId>')
