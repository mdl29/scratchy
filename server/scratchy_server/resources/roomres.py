import json
from flask import Response
from flask_restful import Resource, abort, request
import logging
from marshmallow import Schema
from webargs import fields
from flask_apispec.views import MethodResource
from scratchy_server import db_scratchy
import marshmallow_mongoengine as ma
from flask_apispec import ResourceMeta, Ref, doc, marshal_with, use_kwargs



class RoomModel(db_scratchy.Document):
    description = db_scratchy.StringField()
    title = db_scratchy.StringField()
    users = db_scratchy.ListField(db_scratchy.ObjectIdField())




class RoomSchema(ma.ModelSchema):
    class Meta:
        fields = ('title', 'description', 'users')



# Annotation de la ressource flaskrestful avec le schéma marshmallow généré
#    -> Utilisé pour le format de sortie des reponses des endpoint dans le swagger par flask_apispec
@marshal_with(RoomSchema) 
class RoomRes(MethodResource):

    # Annotation qui décrit le format du paramètre query GET
    # Utilisé pour que le swagger sache qu'on peut ajouter un filtre roomId="ID"
    # Cf https://webargs.readthedocs.io/en/latest/#usage-and-simple-examples
    @use_kwargs({'title': fields.Str(),'description': fields.Str()}, location="query")
    def get(self):
        return RoomModel.query.filter_by(**kwargs)

    @use_kwargs(RoomSchema)
    @marshal_with(RoomSchema)
    def post(self,**kwargs):
        room = RoomModel(**kwargs).save()
        return room.id






'''
class RoomRes(MethodResource):

    @marshal_with(RoomSchema)
    def get(self, roomId):
        try:
            return RoomModel.query.filter(RoomModel.id == roomId).one()
        except IndexError:
            abort(404)
        else:
            logging.debug("here is the room: ")
            return response

    def post(self):
        roomData = request.get_json()
        room = RoomModel()
        # room.id = uuid.uuid4().hex
        room.title = roomData['title'] if 'title' in roomData else "Default title"
        room.description = roomData['description'] if 'description' in roomData else "Default description"

        # database['rooms'][room.id] = room
        room = room.save()
        logging.debug("created the room: %s", room.title)
        return {'id': str(room.id)}

    def put(self, roomId):
        roomData = request.get_json()
        RoomModel.objects.get(id=roomId).update(**roomData)
        logging.debug("the room has been updated")
        return {'id': roomId}


    def delete(self, roomId):
        try:
            response = RoomModel.objects.get(id=roomId)
        except IndexError:
            abort(404)
        else:
            logging.debug("currently deleting the room: %s", json.loads(response.to_json())["title"])
            try:
                response.delete()
            except Exception:
                return {'success': False}
            logging.debug("done, %s has been deleted", json.loads(response.to_json())["title"])
            return {'success': True}
'''