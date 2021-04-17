import uuid
from flask import Flask
from flask_cors import CORS
from flask_restful import Resource, Api, abort, request

from scratchy_server.resources.roomres import RoomRes
from scratchy_server.resources.userres import UserRes
from scratchy_server.resources.messageres import MessageRes
from scratchy_server import db_scratchy
import logging


logging.basicConfig(level=logging.DEBUG)
app = Flask(__name__)
CORS(app)

app.config['MONGODB_SETTINGS'] = {
    'db': 'scratchy',
    'username':'root',
    'password':'example',
    'host': 'localhost',
    'port': 27017,
    'authentication_source':'admin'
}
db_scratchy.init_app(app)
api = Api(app)


# database["messages"]["0"] = messageExemple

api.add_resource(RoomRes, '/api/room', '/api/room/<string:roomId>')
api.add_resource(UserRes, '/api/user', '/api/user/<string:userId>')
api.add_resource(MessageRes, '/api/message', '/api/message/<string:messageId>')
