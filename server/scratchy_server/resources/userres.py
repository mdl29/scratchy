import uuid
from flask_restful import Resource, abort, request
from scratchy_server.model.userModel import UserModel
from scratchy_server.database import database

class UserRes(Resource):
    def get(self, userId):

        try:
            return UserModel.objects.get(id=userId).to_json()
        except IndexError as ie:
            abort(404)
        # RoomModel.objects.get(id='4f4381f4e779897a2c000009')
        # RoomModel.objects.get(id=bson.objectid.ObjectId('4f4381f4e779897a2c000009'))

    def post(self):
        userData = request.get_json()
        user = UserModel()
        # room.id = uuid.uuid4().hex
        user.pseudo = userData['pseudo'] if 'pseudo' in userData else "unknow pseudo"
        user.profileImage = userData['profileImage'] if 'profileImage' in userData else "default profile image"
        user.user = userData['user'] if 'user' in userData else "default"
        


        # database['rooms'][room.id] = room
        user = user.save()
        return { 'id': str(user.id)}

    def delete(self, userId):
        try:
            UserModel.objects.get(id=userId).delete()
            return {'success':True}
        except IndexError as ie:
            abort(404)
