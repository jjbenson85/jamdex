from flask import Blueprint
from models.jam import Jam, JamSchema
from lib.secure_route import secure_route


jam_schema = JamSchema()
jams_schema = JamSchema(many=True)

api = Blueprint('jams', __name__)

@api.route('/jams', methods=['GET'])
@secure_route
def index():
    jams = Jam.query.all()
    return jams_schema.jsonify(jams)

@api.route('/jams/<int:jam_id>', methods=['GET'])
@secure_route
def show(jam_id):
    jam = Jam.query.get(jam_id)
    return jam_schema.jsonify(jam)
