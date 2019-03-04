from app import db
from flask import Blueprint, jsonify, request, g
from models.jam import Jam, JamSchema
from models.synth import Synth
from models.drum import Drum
from models.beat import Beat
from models.poly import Poly
from models.poly_beat import PolyBeat
from lib.secure_route import secure_route
# import json


jam_schema = JamSchema()
jams_schema = JamSchema(many=True)

api = Blueprint('jams', __name__)

@api.route('/jams', methods=['GET'])
def index():
    jams = Jam.query.all()
    return jams_schema.jsonify(jams)

@api.route('/jams/top_jam', methods=['GET'])
def top_jam():
    jams = Jam.query.order_by(Jam.applause.desc()).limit(1).all()
    return jams_schema.jsonify(jams)

@api.route('/jams', methods=['POST'])
@secure_route
def create():
    json_data = request.get_json()

    class Dictify(object):
        def __init__(self, data):
            self.__dict__ = data


    jam_state = Dictify(json_data)

    res_mono_beats = jam_state.owned_synths[0]['beats']

    new_jam = Jam(
    jam_name='New Jam',
    created_by=g.current_user,
    exported=False,
    tempo=json_data['tempo'],
    swing=json_data['swing'])

    new_jam.save()

    MonoSynth = Synth(synth_name='MonoSynth', jam=new_jam)
    MonoSynth.save()

    DrumMachine = Drum(synth_name='DrumMachine', jam=new_jam)
    DrumMachine.save()

    for beat in res_mono_beats:
        # print(beat['pitch'])
        new_beat = Beat(
            step=beat['step'],
            pitch=beat['pitch'],
            duration=beat['duration'],
            velocity=beat['velocity'],
            synth=MonoSynth
        )
        new_beat.save()

    # poly_list = []
    # poly_beat_list = []
    res_drum_beats = jam_state.owned_drums[0]['beats']
    # for i in range(16):
    for beat in res_drum_beats:
        poly = Poly(step=beat['step'], drum=DrumMachine)
        poly.save()
        # poly_list.append(poly)
        # for j in range(4):
        for pBeat in beat['poly_beats']:
            poly_beat = PolyBeat(
                step=pBeat['step'],
                voice=pBeat['voice'],
                pitch=pBeat['pitch'],
                duration=pBeat['duration'],
                velocity=pBeat['velocity'],
                poly=poly
            )
            poly_beat.save()
            # poly_beat_list.append(poly_beat)


    # print('poly_list', poly_list)
    # print('poly_beat_list', poly_beat_list)
    # db.session.bulk_save_objects(poly_list)
    # db.session.bulk_save_objects(poly_beat_list)

    return jam_schema.jsonify(new_jam), 201


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


    json_data = request.get_json()

    class Dictify(object):
        def __init__(self, data):
            self.__dict__ = data


    jam_state = Dictify(json_data)

    #   print('jam_state', jam_state.owned_drums[0]['beats'][0]['poly_beats'][0]['voice'])

    jam, errors = jam_schema.load(request.get_json(), instance=jam)


    if errors:
        print(errors)
        return jsonify(errors), 422
    jam.save()

    return jam_schema.jsonify(jam), 200
