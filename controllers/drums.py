from flask import Blueprint
from models.drum import Drum, DrumSchema
from lib.secure_route import secure_route


drum_schema = DrumSchema()
drums_schema = DrumSchema(many=True)

api = Blueprint('drums', __name__)

@api.route('/drums', methods=['GET'])
@secure_route
def index():
    drums = Drum.query.all()
    return drums_schema.jsonify(drums)

@api.route('/drums/<int:drum_id>', methods=['GET'])
@secure_route
def show(drum_id):
    drum = Drum.query.get(drum_id)
    return drum_schema.jsonify(drum)
