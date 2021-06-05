from flask import make_response
from flask_apispec import marshal_with, use_kwargs, doc
from flask_apispec.views import MethodResource
from marshmallow import fields

from scratchy_server.model.userModel import UserModel, UserSchema, AllUserSchema
from scratchy_server.filters.mongoexception import validation


@doc(tags=['User'])
class UserRes(MethodResource):
    decorators = [validation]

    @marshal_with(UserSchema, 200)
    def get(self, userId):
        return UserModel.objects().get_or_404(id=userId)

    @marshal_with(UserSchema, 200)
    @use_kwargs(UserSchema)
    def put(self, userId, **kwargs):
        user = UserModel.objects().get_or_404(id=userId)
        user.modify(**kwargs)
        return user

    @marshal_with(None, code=204)
    def delete(self, userId):
        UserModel.objects().get_or_404(id=userId).delete()
        return make_response('', 204)


@doc(tags=['User'])
class AllUserRes(MethodResource):
    decorators = [validation]

    @marshal_with(AllUserSchema, code=200)
    @use_kwargs({"pseudo": fields.String()}, location="query")
    def get(self, pseudo=None):

        #get all users
        if pseudo is None:
            return {"users": UserModel.objects()}

        # get by pseudo
        elif pseudo is not None:
            return {"users": [UserModel.objects().get_or_404(pseudo=pseudo)]}

    @marshal_with(UserSchema, code=201)
    @use_kwargs(UserSchema)
    def post(self, **kwargs):
        user = UserModel(**kwargs)
        user.save()
        return user, 201

    @marshal_with(AllUserSchema, code=204)
    def delete(self):
        UserModel.objects().delete()
        return make_response('', 204)
