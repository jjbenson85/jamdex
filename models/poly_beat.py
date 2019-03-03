from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

class PolyBeat(db.Model, BaseModel):

    __tablename__ = 'poly_beats'

    step = db.Column(db.Integer, nullable=False)
    voice = db.Column(db.Integer, nullable=False)
    pitch = db.Column(db.String(4), nullable=False, default="C3")
    duration = db.Column(db.String(4), nullable=False, default="16n")
    velocity = db.Column(db.String(4), nullable=False, default="100")

    # Create owner_id columns from owners id
    poly_id = db.Column(db.Integer, db.ForeignKey('polys.id'))

    # Make owned_by Creator owned_gifs field?
    # owned_by = db.relationship('Creator', backref='owned_gifs')
    poly = db.relationship('Poly', backref='poly_beats')

class PolyBeatSchema(ma.ModelSchema, BaseSchema):
    # poly = fields.Nested('PolySchema',
    #     only=('step', 'id'))

    class Meta:
        model = PolyBeat
