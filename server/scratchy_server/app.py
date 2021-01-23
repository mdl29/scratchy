import uuid
from flask import Flask
from flask_restful import Resource, Api, abort, request
from scratchy_server.model.roomModel import RoomModel
from scratchy_server.model.messageModel import MessageModel
from scratchy_server.model.userModel import UserModel
from scratchy_server.resources.roomres import RoomRes
from scratchy_server.resources.messageres import MessageRes
from scratchy_server.resources.userres import UserRes
from scratchy_server import database

app = Flask(__name__)
api = Api(app)

# Data set
roomExemple = RoomModel()
roomExemple.id = "0"
roomExemple.title = "Mon premier salon"
roomExemple.description = "Salon de test"

database["rooms"]["0"] = roomExemple

api.add_resource(RoomRes, '/api/room', '/api/room/<string:roomId>')

# default message

messageExemple = MessageModel()
messageExemple.id = "0"
messageExemple.content = "default content"
messageExemple.author = "unknow"
messageExemple.roomId = "0"

database["message"]["0"] = messageExemple

api.add_resource(MessageRes, '/api/message', '/api/message/<string:messageId>')  

# default user

userExemple = UserModel()
userExemple.id = "0"
userExemple.pseudo = "default pseudo"
userExemple.profileImage = "default profile image"
userExemple.idGithub = "default id github"
userExemple.roomsId = "0"

database["user"]["0"] = userExemple

api.add_resource(UserRes, '/api/user', '/api/user/<string:userId>')  