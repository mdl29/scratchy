import uuid
from flask import Flask
from flask_restful import Resource, Api, abort, request
from scratchy_server.model.roomModel import RoomModel
from scratchy_server.resources.roomres import RoomRes
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
api.add_resource(UserRes, '/api/user', '/api/user/<string:userId>')
        
