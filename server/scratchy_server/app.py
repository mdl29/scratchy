from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from scratchy_server.resources.roomres import RoomRes
from scratchy_server.resources.userres import UserRes
from scratchy_server.resources.messageres import MessageRes
from scratchy_server import db_scratchy
from flask_apispec.extension import FlaskApiSpec
import logging
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin


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


# database["messages"]["0"] = messageExemple

api.add_resource(RoomRes, '/api/room', '/api/room/<string:roomId>')
api.add_resource(UserRes, '/api/user', '/api/user/<string:userId>')
api.add_resource(MessageRes, '/api/message', '/api/message/<string:messageId>')

app.add_url_rule('/api/room/<string:roomId>', view_func=RoomRes.as_view('RoomRes'))
app.add_url_rule('/api/room/<string:roomId>', view_func=UserRes.as_view('UserRes'))
app.add_url_rule('/api/room/<string:roomId>', view_func=MessageRes.as_view('MessageRes'))

docs.register(RoomRes, endpoint='RoomRes')
docs.register(UserRes, endpoint='UserRes')
docs.register(MessageRes, endpoint='MessageRes')


logging.info("scratchy is up and ready")
