import marshmallow as ma
import bson


class ObjectId(ma.fields.Field):
    """
    Marshmallow field for :class:`bson.ObjectId`
    """
    def _serialize(self, value, attr, obj):
        if value is None:
            return None
        return str(value)

    def _deserialize(self, value, attr, data):
        try:
            return bson.ObjectId(value)
        except (TypeError, bson.errors.InvalidId):
            raise ValidationError(_('Invalid ObjectId.'))
