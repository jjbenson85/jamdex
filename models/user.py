from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

class User(db.Model, BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(64), nullable=False)
    password_hash = db.Column(db.String(128), nullable=True)

class UserSchema(ma.ModelSchema, BaseSchema):
    created_jams = fields.Nested('JamSchema',
        many=True,
        only=('jam_name', 'id'))

    owned_synths = fields.Nested('SynthSchema',
        many=True,
        only=('synth_name', 'id'))

    class Meta:
        model = User
        exclude = ('password_hash', )
