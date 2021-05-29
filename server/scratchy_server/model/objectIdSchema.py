import marshmallow as ma
import bson

# created because of incompatibility of marshmallow with object id
# the code is copy past from: https://github.com/marshmallow-code/marshmallow/issues/1542
# and i added kwargs arumgent to deserialize
class ObjectIdSchema(ma.fields.String):
    """
    Marshmallow field for :class:`bson.ObjectId`
    """
    def _serialize(self, value, attr, obj):
        if value is None:
            return None
        return str(value)

    def _deserialize(self, value, attr, data, **kwargs):
        try:
            return bson.ObjectId(value)
        except (TypeError, bson.errors.InvalidId):
            raise ValidationError(_('Invalid ObjectId.'))
