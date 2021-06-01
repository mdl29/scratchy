from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_apispec.extension import FlaskApiSpec
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
import logging

from scratchy_server import db_scratchy
from scratchy_server.resources.roomres import RoomRes, AllRoomRes
from scratchy_server.resources.userres import UserRes, AllUserRes
from scratchy_server.resources.messageres import MessageRes, AllMessageRes


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

ressource = (
    {"name": "RoomRes", "ressource": RoomRes, "url": "/api/room/<string:roomId>"},
    {"name": "UserRes", "ressource": UserRes, "url": "/api/user/<string:userId>"},
    {"name": "MessageRes", "ressource": MessageRes, "url": "/api/message/<string:messageId>"},
    {"name": "AllRoomRes", "ressource": AllRoomRes, "url": "/api/room"},
    {"name": "AllUserRes", "ressource": AllUserRes, "url": "/api/user"},
    {"name": "AllMessageRes", "ressource": AllMessageRes, "url": "/api/message"}
)

list(map(lambda res: api.add_resource(res["ressource"], res["url"]), ressource))
list(map(lambda res: app.add_url_rule(res["url"], view_func=res["ressource"].as_view(res["name"])), ressource))
list(map(lambda res: docs.register(res["ressource"], endpoint=res["name"]), ressource))


logging.info("scratchy is up and ready")
