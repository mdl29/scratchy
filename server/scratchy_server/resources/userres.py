import uuid
import json
from flask import Response
from flask_restful import Resource, abort, request
from scratchy_server.model.userModel import UserModel
import logging
from mongoengine import NotUniqueError

class UserRes(Resource):
    def get(self, userId=None):
        if userId is None:
            # check parameter (search roomid)
            pseudo = request.args.get('pseudo')
            if pseudo:
                try:
                    response = Response(UserModel.objects.get(pseudo=pseudo).to_json(), mimetype="application/json", status=200)
                except UserModel.DoesNotExist as ie:
                    abort(404)
                else:
                    if logging.getLogger().isEnabledFor(logging.DEBUG):
                        logging.debug("here is the user:\n%s", json.loads(response.get_data()))

                    return response
        else:
            try:
                response = Response(UserModel.objects.get(id=userId).to_json(), mimetype="application/json", status=200)
            except IndexError as ie:
                abort(404)
            else:
                logging.debug("here is the user: %s",json.loads(response.get_data())["user"])
                return response

    def post(self):
        userData = request.get_json()
        user = UserModel()
        # room.id = uuid.uuid4().hex
        user.pseudo = userData['pseudo'] if 'pseudo' in userData else "unknow pseudo"
        user.profileImage = userData['profileImage'] if 'profileImage' in userData else "default profile image"
        user.user = userData['user'] if 'user' in userData else "default"
        

        try:
            user = user.save()
        except NotUniqueError:
            logging.debug("the pseudo is already used")
            abort(409)
        logging.debug("user: '%s' has been created",user.user)
        return { 'id': str(user.id)}

    def delete(self, userId):
        try:
            response = UserModel.objects.get(id=userId)
        except IndexError as ie:
            abort(404)
        else:
            logging.debug("currently deleting the user: %s",json.loads(response.to_json())["user"])
            try:
                response.delete()
            except:
                return {'success':False}
            logging.debug("done, %s has been deleted",json.loads(response.to_json())["user"])
            return {'success':True}
