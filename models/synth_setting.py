from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

class SynthSetting(db.Model, BaseModel):

    __tablename__ = 'synth_settings'

    preset = db.Column(db.Integer, nullable=False, default=0)

    # Create owner_id columns from owners id
    synth_id = db.Column(db.Integer, db.ForeignKey('synths.id'))

    # Make owned_by Creator owned_gifs field?
    # owned_by = db.relationship('Creator', backref='owned_gifs')
    synth = db.relationship('Synth', backref='synth_settings')

class SynthSettingSchema(ma.ModelSchema, BaseSchema):
    synth = fields.Nested('SynthSchema',
        only=('synth_name', 'id', 'jam_id'))

    class Meta:
        model = SynthSetting
