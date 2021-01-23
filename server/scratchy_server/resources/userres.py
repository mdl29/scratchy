import uuid
from flask_restful import Resource, abort, request
from scratchy_server.model.userModel import UserModel
from scratchy_server.database import database

class UserRes(Resource):
    def get(self, userId):
        if not userId in database["user"]:
            abort(404)

        return database["user"][userId].__dict__

    def post(self):
        userData = request.get_json()
        user = UserModel()
        user.id = uuid.uuid4().hex
        user.pseudo = userData['pseudo'] if 'pseudo' in userData else "unknow user"
        user.profileImage = userData['profileImage'] if 'profileImage' in userData else "a profile image"
        user.idGithub = userData['idGithub'] if 'idGithub' in userData else "default id github"
        user.roomsId = userData['roomsId'] if 'roomsId' in userData else "rooms Id"
        

        database['user'][user.id] = user
        return user.__dict__

    def delete(self, userId):
        if not userId in database["user"]:
            abort(404)

        if userId in database["user"]:
            del database["user"][userId]