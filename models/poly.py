from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

class Poly(db.Model, BaseModel):

    __tablename__ = 'polys'

    step = db.Column(db.Integer, nullable=False)

    # Create owner_id columns from owners id
    drum_id = db.Column(db.Integer, db.ForeignKey('drums.id'))

    # Make owned_by Creator owned_gifs field?
    # owned_by = db.relationship('Creator', backref='owned_gifs')
    drum = db.relationship('Drum', backref='polys')

class PolySchema(ma.ModelSchema, BaseSchema):
    drum = fields.Nested('DrumSchema',
        only=('drum_name', 'id', 'jam_id'))

    poly_beats = fields.Nested('PolyBeatSchema', many=True,
        exclude=('created_at', 'updated_at',))
        # only=('synth_name', 'id', 'jam_id'))

    class Meta:
        model = Poly
