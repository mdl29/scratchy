from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_apispec.extension import FlaskApiSpec
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
import logging

from scratchy_server import db_scratchy
from scratchy_server.resources.roomres import RoomRes, AllRoomRes
from scratchy_server.resources.userres import UserRes, NoIdUserRes
from scratchy_server.resources.messageres import MessageRes, NoIdMessageRes


logging.basicConfig(level=logging.DEBUG)
app = Flask(__name__)
CORS(app)

app.config['MONGODB_SETTINGS'] = {
    'db': 'scratchy',
    'username': 'root',
    'password': 'example',
    'host': 'localhost',
    'port': 27017,
    'authentication_source': 'admin'
}

app.config.update({
    'APISPEC_SPEC': APISpec(
        openapi_version='2.0',
        title='scratchy',
        version='v1',
        plugins=[MarshmallowPlugin()],
    ),
    'APISPEC_SWAGGER_URL': '/swagger/',
})

docs = FlaskApiSpec(app)
db_scratchy.init_app(app)
api = Api(app)

Res =    ( RoomRes,   UserRes,   MessageRes,   AllRoomRes,   NoIdUserRes,   NoIdMessageRes)
ResStr = ("RoomRes", "UserRes", "MessageRes", "AllRoomRes", "NoIdUserRes", "NoIdMessageRes")
ResUrl = ("/api/room/<string:roomId>", "/api/user/<string:userId>", "/api/message/<string:messageId>", "/api/room", "/api/user", "/api/message")

list(map(lambda res, url: api.add_resource(res, url), Res, ResUrl))
list(map(lambda res, url, string: app.add_url_rule(url, view_func=res.as_view(string)), Res, ResUrl, ResStr))
list(map(lambda res, string: docs.register(res, endpoint=string) , Res, ResStr))


logging.info("scratchy is up and ready")
