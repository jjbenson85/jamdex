from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

class SynthSetting(db.Model, BaseModel):

    __tablename__ = 'synth_settings'
    oscillator_type = db.Column(db.String(8), nullable=False, default='sawtooth')
    envelope_attack = db.Column(db.Float, nullable=False, default=0.01)
    envelope_decay = db.Column(db.Float, nullable=False, default=0.2)
    envelope_sustain = db.Column(db.Float, nullable=False, default=0.50)
    envelope_release = db.Column(db.Float, nullable=False, default=0.2)

    filterEnvelope_attack = db.Column(db.Float, nullable=False, default=0.2)
    filterEnvelope_decay = db.Column(db.Float, nullable=False, default=0.01)
    filterEnvelope_sustain = db.Column(db.Float, nullable=False, default=0.50)
    filterEnvelope_release = db.Column(db.Float, nullable=False, default=0.2)
    filterEnvelope_baseFrequency = db.Column(db.Float, nullable=False, default=150)
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
