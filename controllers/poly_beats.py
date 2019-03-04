from flask import Blueprint
from models.poly_beat import PolyBeat, PolyBeatSchema
from lib.secure_route import secure_route


poly_beat_schema = PolyBeatSchema()
poly_beats_schema = PolyBeatSchema(many=True)

api = Blueprint('poly_beats', __name__)

@api.route('/polybeats', methods=['GET'])
@secure_route
def index():
    poly_beats = PolyBeat.query.all()
    return poly_beats_schema.jsonify(poly_beats)

@api.route('/polybeats/<int:poly_beat_id>', methods=['GET'])
@secure_route
def show(poly_beat_id):
    poly_beat = PolyBeat.query.get(poly_beat_id)
    return poly_beat_schema.jsonify(poly_beat)
