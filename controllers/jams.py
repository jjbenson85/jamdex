from flask import Blueprint, jsonify, request, g
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

@api.route('/jams', methods=['POST'])
@secure_route
def create():
    jam, errors = jam_schema.load(request.get_json())
    print('request.get_json()', request.get_json())

    if errors:
        return jsonify(errors), 422

    jam.created_by = g.current_user

    print(jam.owned_synths)

    jam.save()
    return jam_schema.jsonify(jam), 201

@api.route('/jams/<int:jam_id>', methods=['GET'])
@secure_route
def show(jam_id):
    jam = Jam.query.get(jam_id)
    return jam_schema.jsonify(jam)

@api.route('/jams/<int:jam_id>', methods=['PUT'])
def update(jam_id):
    jam = Jam.query.get(jam_id)
    if not jam:
        return jsonify({'message': 'Not found'}), 404
    jam, errors = jam_schema.load(request.get_json(), instance=jam)
    if errors:
        print(errors)
        return jsonify(errors), 422
    jam.save()

    return jam_schema.jsonify(jam), 200
