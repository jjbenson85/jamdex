from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

class Drum(db.Model, BaseModel):

    __tablename__ = 'drums'

    synth_name = db.Column(db.String(32), nullable=False)
    # test = db.Column(db.String(32), default="TEST")

    # Create owner_id columns from owners id
    jam_id = db.Column(db.Integer, db.ForeignKey('jams.id'))

    # Make owned_by Creator owned_gifs field?
    # owned_by = db.relationship('Creator', backref='owned_gifs')
    jam = db.relationship('Jam', backref='owned_drums')

class DrumSchema(ma.ModelSchema, BaseSchema):
    jam = fields.Nested('JamSchema',
        exclude=('created_at', 'updated_at',))

    beats = fields.Nested('PolySchema', many=True,
        exclude=('created_at', 'updated_at', 'drum'))
        # exclude=('created_at', 'updated_at', 'drum'))

    class Meta:
        model = Drum
