from flask import abort
import sys
from mongoengine.errors import ValidationError

def get(model, id):
    try:
        return model.objects().get_or_404(id=id)
    except ValidationError:
        _, excValue, _ = sys.exc_info() # get the error message

        # checking if the error is about not being a valid ObjectId
        if str(excValue).split('\'')[2] == ' is not a valid ObjectId, it must be a 12-byte input or a 24-character hex string':
            abort(400, "The id is not a valid ObjectId, it must be a 12-byte input or a 24-character hex string")
        else:
            return ValidationError
