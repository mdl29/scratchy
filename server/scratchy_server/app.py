from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_socketio import SocketIO
from flask_apispec.extension import FlaskApiSpec
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
import logging
import json

from prometheus_flask_exporter import PrometheusMetrics

from scratchy_server import db_scratchy
from scratchy_server.resources.roomres import RoomRes, AllRoomRes
from scratchy_server.resources.userres import UserRes, AllUserRes
from scratchy_server.resources.messageres import MessageRes, AllMessageRes

import yaml
import logging
import logging.config

with open('logging.yaml', 'r') as logging_file:
    config_logging = yaml.load(logging_file, Loader=yaml.FullLoader)

logging.config.dictConfig(config_logging)

# load scratchy configuration from file
with open('config.json', 'r') as config_file:
    config_data = json.load(config_file)

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

# main configuration from config data (file)
app.config.update(config_data)

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

## Add Metrics for Scratchy
metrics = PrometheusMetrics(app)
# metrics.register_endpoint('/metrics')
# static information as metric
metrics.info('app_info', 'Application info', version='2.0.0')

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

socketio.on_namespace(RoomRes('/room/<string:roomId>'))

socketio.run(app, port=5000, host='0.0.0.0')

logging.info("scratchy is up and ready")
