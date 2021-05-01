from scratchy_server.model.userModel import UserModel, UserSchema
import logging
from mongoengine import NotUniqueError
from flask_apispec.views import MethodResource
from flask_apispec import marshal_with, use_kwargs


@marshal_with(UserSchema)
class UserRes(MethodResource):

    def get(self, userId):
        return UserModel.objects().get_or_404(id=userId)

    @use_kwargs(UserSchema)
    def post(self, **kwargs):
        user = UserModel(**kwargs)
        user.save()
        return user

    @use_kwargs(UserSchema)
    def put(self, userId, **kwargs):
        user = UserModel.objects().get_or_404(id=userId)
        user.update(**kwargs)
        return user

    def delete(self, userId):
        UserModel.objects().get_or_404(id=userId).delete()
        return None
