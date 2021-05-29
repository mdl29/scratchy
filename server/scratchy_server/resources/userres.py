from flask import make_response
from flask_apispec import marshal_with, use_kwargs, doc
from flask_apispec.views import MethodResource
from marshmallow import fields
from scratchy_server.filters.mongoexception import validation

@doc(tags=['User'])
@marshal_with(UserSchema)
class UserRes(MethodResource):
    decorators = [validation]

    def get(self, userId):
        return UserModel.objects().get_or_404(id=userId)

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

    @marshal_with(AllUserSchema)
    @use_kwargs({"pseudo": fields.String()}, location="query")
    def get(self, pseudo=None):

        #get all users
        if pseudo is None:
            return {"users": UserModel.objects()}

        # get by pseudo
        elif pseudo is not None:
            return {"users": [UserModel.objects().get_or_404(pseudo=pseudo)]}

    @marshal_with(UserSchema)
    @use_kwargs(UserSchema)
    def post(self, **kwargs):
        user = UserModel(**kwargs)
        user.save()
        return user
