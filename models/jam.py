from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

class Jam(db.Model, BaseModel):

    __tablename__ = 'jams'

    jam_name = db.Column(db.String(32), nullable=False)
    tempo = db.Column(db.Integer, nullable=False, default=120)
    exported = db.Column(db.Boolean, nullable=False, default=False)

    # Create creator_id columns from creators id
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Make created_by Creator created_gifs field?
    # created_by = db.relationship('Creator', backref='created_gifs')
    created_by = db.relationship('User', backref='created_jams')


class JamSchema(ma.ModelSchema, BaseSchema):
    created_by = fields.Nested('UserSchema',
        only=('username', 'id'))

    owned_synths = fields.Nested('SynthSchema',
        many=True,
        exclude=('jam',))

    class Meta:
        model = Jam
