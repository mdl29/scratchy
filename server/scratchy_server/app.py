from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from scratchy_server.resources.roomres import RoomRes, AllRoomRes
from scratchy_server.resources.userres import UserRes, NoIdUserRes
from scratchy_server.resources.messageres import MessageRes, NoIdMessageRes
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

api.add_resource(RoomRes, '/api/room/<string:roomId>')
api.add_resource(AllRoomRes, '/api/room')
api.add_resource(UserRes, '/api/user', '/api/user/<string:userId>')
api.add_resource(NoIdUserRes, '/api/user', '/api/user')
api.add_resource(MessageRes, '/api/message', '/api/message/<string:messageId>')
api.add_resource(NoIdMessageRes, '/api/message', '/api/message')


# path for the apispec you can have info there: https://flask-apispec.readthedocs.io/en/latest/usage.html
app.add_url_rule('/api/room/<string:roomId>', view_func=RoomRes.as_view('RoomRes'))
app.add_url_rule('/api/room', view_func=AllRoomRes.as_view('AllRoomRes'))
app.add_url_rule('/api/user/<string:userId>', view_func=UserRes.as_view('UserRes'))
app.add_url_rule('/api/user', view_func=NoIdUserRes.as_view('NoIdUserRes'))
app.add_url_rule('/api/message/<string:messageId>', view_func=MessageRes.as_view('MessageRes'))
app.add_url_rule('/api/message', view_func=NoIdMessageRes.as_view('NoIdMessageRes'))

docs.register(RoomRes, endpoint='RoomRes')
docs.register(AllRoomRes, endpoint='AllRoomRes')
docs.register(UserRes, endpoint='UserRes')
docs.register(NoIdUserRes, endpoint='NoIdUserRes')
docs.register(MessageRes, endpoint='MessageRes')
docs.register(NoIdMessageRes, endpoint='NoIdMessageRes')


logging.info("scratchy is up and ready")
