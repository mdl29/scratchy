from flask import abort
from functools import wraps
from mongoengine.errors import ValidationError
import logging

def validation(func): # not entirely satisfied by the name, hoping someone will find a better one

    @wraps(func)
    def new_func(*args, **kwargs):
        try:
        	return func(*args, **kwargs)
        except ValidationError as error:
            # checking if the error is about not being a valid ObjectId
            error = str(error)

            if error.split('\'')[2] == ' is not a valid ObjectId, it must be a 12-byte input or a 24-character hex string':
                abort(400, error)
            else:
                return ValidationError

    return new_func
