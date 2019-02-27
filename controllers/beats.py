from flask import Blueprint
from models.beat import Beat, BeatSchema
from lib.secure_route import secure_route


beat_schema = BeatSchema()
beats_schema = BeatSchema(many=True)

api = Blueprint('beats', __name__)

@api.route('/beats', methods=['GET'])
@secure_route
def index():
    beats = Beat.query.all()
    return beats_schema.jsonify(beats)

@api.route('/beats/<int:beat_id>', methods=['GET'])
@secure_route
def show(beat_id):
    beat = Beat.query.get(beat_id)
    return beat_schema.jsonify(beat)
