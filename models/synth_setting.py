from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

class SynthSetting(db.Model, BaseModel):

    __tablename__ = 'synth_settings'

    envelope_attack = db.Column(db.Float, nullable=False, default=0.2)
    envelope_decay = db.Column(db.Float, nullable=False, default=0.01)
    envelope_sustain = db.Column(db.Float, nullable=False, default=1.00)
    envelope_release = db.Column(db.Float, nullable=False, default=0.2)

    filterEnvelope_attack = db.Column(db.Float, nullable=False, default=0.2)
    filterEnvelope_decay = db.Column(db.Float, nullable=False, default=0.01)
    filterEnvelope_sustain = db.Column(db.Float, nullable=False, default=1.00)
    filterEnvelope_release = db.Column(db.Float, nullable=False, default=0.2)
    filterEnvelope_baseFrequency = db.Column(db.Float, nullable=False, default=200)
    filter_Q = db.Column(db.Float, nullable=False, default=1)

    # Create owner_id columns from owners id
    synth_id = db.Column(db.Integer, db.ForeignKey('synths.id'))

    # Make owned_by Creator owned_gifs field?
    # owned_by = db.relationship('Creator', backref='owned_gifs')
    synth = db.relationship('Synth', backref='settings')

class SynthSettingSchema(ma.ModelSchema, BaseSchema):
    synth = fields.Nested('SynthSchema',
        only=('synth_name', 'id', 'jam_id'))

    class Meta:
        model = SynthSetting
