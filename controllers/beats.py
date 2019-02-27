from flask import Blueprint
from models.beat import Beat, BeatSchema

beat_schema = BeatSchema()
beats_schema = BeatSchema(many=True)

api = Blueprint('beats', __name__)

@api.route('/beats', methods=['GET'])
def index():
    beats = Beat.query.all()
    return beats_schema.jsonify(beats)
