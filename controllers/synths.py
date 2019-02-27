from flask import Blueprint
from models.synth import Synth, SynthSchema

synth_schema = SynthSchema()
synths_schema = SynthSchema(many=True)

api = Blueprint('synths', __name__)

@api.route('/synths', methods=['GET'])
def index():
    synths = Synth.query.all()
    return synths_schema.jsonify(synths)
