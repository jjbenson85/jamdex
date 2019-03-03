from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

class Beat(db.Model, BaseModel):

    __tablename__ = 'beats'

    step = db.Column(db.Integer, nullable=False)
    poly_id = db.Column(db.Integer, nullable=False, default=0)
    pitch = db.Column(db.String(4), nullable=False, default="C3")
    duration = db.Column(db.String(4), nullable=False, default="16n")
    velocity = db.Column(db.String(4), nullable=False, default="16n")

    # Create owner_id columns from owners id
    synth_id = db.Column(db.Integer, db.ForeignKey('synths.id'))

    # Make owned_by Creator owned_gifs field?
    # owned_by = db.relationship('Creator', backref='owned_gifs')
    synth = db.relationship('Synth', backref='beats')

class BeatSchema(ma.ModelSchema, BaseSchema):
    synth = fields.Nested('SynthSchema',
        only=('synth_name', 'id', 'jam_id'))

    class Meta:
        model = Beat
