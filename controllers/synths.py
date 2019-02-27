from flask import Blueprint
from models.synth import Synth, SynthSchema
from lib.secure_route import secure_route


synth_schema = SynthSchema()
synths_schema = SynthSchema(many=True)

api = Blueprint('synths', __name__)

@api.route('/synths', methods=['GET'])
@secure_route
def index():
    synths = Synth.query.all()
    return synths_schema.jsonify(synths)

@api.route('/synths/<int:synth_id>', methods=['GET'])
@secure_route
def show(synth_id):
    synth = Synth.query.get(synth_id)
    return synth_schema.jsonify(synth)
