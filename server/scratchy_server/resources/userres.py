import uuid
from flask_restful import Resource, abort, request
from scratchy_server.model.userModel import UserModel
from scratchy_server.database import database

class UserRes(Resource):
    def get(self, userId):
        if not userId in database["users"]:
            abort(404)

        return database["users"][userId].__dict__

    def post(self):
        userData = request.get_json()
        user = UserModel()
        user.id = uuid.uuid4().hex
        user.content = userData['pseudo'] if 'pseudo' in userData else "Default User"
        user.profileImage = userData['profileImage'] if 'profileImage' in userData else "https://http.cat/204"

        database['users'][user.id] = user
        return user.__dict__

    def delete(self, userId):
        if not userId in database["users"]:
            abort(404)

        if userId in database["users"]:
            del database["users"][userId]
