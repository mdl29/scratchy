from scratchy_server.model.userModel import UserModel, UserSchema
from mongoengine import NotUniqueError
from flask_apispec.views import MethodResource
from flask_apispec import marshal_with, use_kwargs, doc
from marshmallow import fields


@doc(tags=['User'])
@marshal_with(UserSchema)
class UserRes(MethodResource):

    @use_kwargs({"pseudo": fields.String()}, location="query")
    def get(self, userId=None, pseudo=None):
        # basic case
        if userId != None:
            return UserModel.objects().get_or_404(id=userId)
        # get by pseudo
        elif pseudo:
            return UserModel.objects().get_or_404(pseudo=pseudo)

    @use_kwargs(UserSchema)
    def put(self, userId, **kwargs):
        user = UserModel.objects().get_or_404(id=userId)
        user.modify(**kwargs)
        return user

    def delete(self, userId):
        UserModel.objects().get_or_404(id=userId).delete()
        return None


class NoIdUserRes(MethodResource):

    @doc(tags=['User'])
    @marshal_with(UserSchema)
    @use_kwargs(UserSchema)
    def post(self, **kwargs):
        user = UserModel(**kwargs)
        user.save()
        return user
