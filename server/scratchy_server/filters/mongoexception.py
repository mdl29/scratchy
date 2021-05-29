from flask import abort
from functools import wraps
from mongoengine.errors import ValidationError
import logging

def validation(ressource_method): # not entirely satisfied by the name, hoping someone will find a better one

    @wraps(ressource_method)
    def mongo_safe_ressource_method(*args, **kwargs):
        try:
        	return ressource_method(*args, **kwargs)
        except ValidationError as error:
            # checking if the error is about not being a valid ObjectId
            error = str(error)

            if error.split('\'')[2] == ' is not a valid ObjectId, it must be a 12-byte input or a 24-character hex string':
                abort(400, error)
            else:
                return ValidationError

    return mongo_safe_ressource_method
