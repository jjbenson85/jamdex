from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

class Synth(db.Model, BaseModel):

    __tablename__ = 'synths'

    synth_name = db.Column(db.String(32), nullable=False)

    # Create owner_id columns from owners id
    jam_id = db.Column(db.Integer, db.ForeignKey('jams.id'))

    # Make owned_by Creator owned_gifs field?
    # owned_by = db.relationship('Creator', backref='owned_gifs')
    jam = db.relationship('Jam', backref='owned_synths')

class SynthSchema(ma.ModelSchema, BaseSchema):
    jam = fields.Nested('JamSchema',
        exclude=('created_at', 'updated_at',))

    beats = fields.Nested('BeatSchema', many=True,
        exclude=('created_at', 'updated_at', 'synth'))

    class Meta:
        model = Synth
