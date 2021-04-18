import uuid

from flask import Response
from flask_restful import Resource, abort, request
from scratchy_server.model.userModel import UserModel
import logging

class UserRes(Resource):
    def get(self, userId):

        try:
            return Response(UserModel.objects.get(id=userId).to_json(), mimetype="application/json", status=200)
        except IndexError as ie:
            abort(404)


    def post(self):
        userData = request.get_json()
        user = UserModel()
        user.pseudo = userData['pseudo'] if 'pseudo' in userData else "unknow pseudo"
        user.profileImage = userData['profileImage'] if 'profileImage' in userData else "default profile image"
        user.user = userData['user'] if 'user' in userData else "default"
        


        user = user.save()
        return { 'id': str(user.id)}

    def delete(self, userId):
        try:
            UserModel.objects.get(id=userId).delete()
            return {'success':True}
        except IndexError as ie:
            abort(404)
