from flask import Blueprint
from models.jam import Jam, JamSchema

jam_schema = JamSchema()
jams_schema = JamSchema(many=True)

api = Blueprint('jams', __name__)

@api.route('/jams', methods=['GET'])
def index():
    jams = Jam.query.all()
    return jams_schema.jsonify(jams)
