from flask import Blueprint
from models.synth_setting import SynthSetting, SynthSettingSchema
from lib.secure_route import secure_route


synth_setting_schema = SynthSettingSchema()
synth_settings_schema = SynthSettingSchema(many=True)

api = Blueprint('synth_settings', __name__)

@api.route('/synth_settings', methods=['GET'])
@secure_route
def index():
    synth_settings = SynthSetting.query.all()
    return synth_settings_schema.jsonify(synth_settings)

@api.route('/synth_settings/<int:synth_setting_id>', methods=['GET'])
@secure_route
def show(synth_setting_id):
    synth_setting = SynthSetting.query.get(synth_setting_id)
    return synth_setting_schema.jsonify(synth_setting)
