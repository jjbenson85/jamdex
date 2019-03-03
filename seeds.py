from app import app, db
from models.user import User, UserSchema
from models.jam import Jam
from models.synth import Synth
from models.drum import Drum
from models.beat import Beat
from models.poly import Poly
from models.poly_beat import PolyBeat


with app.app_context():
    db.drop_all()
    db.create_all()

    user_schema = UserSchema()

    james, errors = user_schema.load({
        'username': 'Jam_Master_Jim',
        'email': 'james@email.com',
        'password': 'passpass',
        'password_confirmation': 'passpass'
    })

    if errors:
        raise Exception(errors)

    db.session.add(james)

    dex, errors = user_schema.load({
        'username': 'Funk_Master_Dex',
        'email': 'dex@email.com',
        'password': 'passpass',
        'password_confirmation': 'passpass'
    })

    if errors:
        raise Exception(errors)

    db.session.add(james)


    james_jam_1 = Jam(jam_name='Jam 1', created_by=james, exported=True)
    james_jam_1.save()

    # james_jam_2 = Jam(jam_name='Jam 2', created_by=james, exported=False)
    # james_jam_2.save()

    MonoSynth = Synth(synth_name='MonoSynth', jam=james_jam_1)
    MonoSynth.save()

    DrumMachine = Drum(drum_name='DrumMachine', jam=james_jam_1)
    DrumMachine.save()

    # MonoSynth2 = Synth(synth_name='MonoSynth', jam=james_jam_2)
    # MonoSynth2.save()
    #
    # DrumMachine2 = Synth(synth_name='DrumMachine', jam=james_jam_2)
    # DrumMachine2.save()
    #
    # dex_jam_1 = Jam(jam_name='Super Dex', created_by=dex)
    # dex_jam_1.save()

    mono_beats = [
        Beat(
            step=0,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=1,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=2,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=3,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=4,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=5,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=6,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=7,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=8,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=9,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=10,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=11,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=12,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=13,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=14,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=15,
            poly_id=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        )
    ]
    db.session.bulk_save_objects(mono_beats)
    # drum_beats = [
    #     Beat(
    #         step=0,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=1,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=2,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=3,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=4,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=5,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=6,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=7,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=8,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=9,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=10,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=11,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=12,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=13,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=14,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     ),
    #     Beat(
    #         step=15,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine
    #     )
    # ]

    # poly0 = Poly(step=0, drum=DrumMachine)
    # poly1 = Poly(step=1, drum=DrumMachine)
    # poly2 = Poly(step=2, drum=DrumMachine)
    # poly3 = Poly(step=3, drum=DrumMachine)
    # poly4 = Poly(step=4, drum=DrumMachine)
    # poly5 = Poly(step=5, drum=DrumMachine)
    # poly6 = Poly(step=6, drum=DrumMachine)
    # poly7 = Poly(step=7, drum=DrumMachine)
    # poly8 = Poly(step=8, drum=DrumMachine)
    # poly9 = Poly(step=9, drum=DrumMachine)
    # poly10 = Poly(step=10, drum=DrumMachine)
    # poly11 = Poly(step=11, drum=DrumMachine)
    # poly12 = Poly(step=12, drum=DrumMachine)
    # poly13 = Poly(step=13, drum=DrumMachine)
    # poly14 = Poly(step=14, drum=DrumMachine)
    # poly15 = Poly(step=15, drum=DrumMachine)
    #
    # drum_beats = [
    #     poly0,
    #     poly1,
    #     poly2,
    #     poly3,
    #     poly4,
    #     poly5,
    #     poly6,
    #     poly7,
    #     poly8,
    #     poly9,
    #     poly10,
    #     poly11,
    #     poly12,
    #     poly13,
    #     poly14,
    #     poly15,
    # ]
    # db.session.bulk_save_objects(drum_beats)

    poly_list = []
    poly_beat_list = []
    for i in range(16):
        poly = Poly(step=i, drum=DrumMachine)
        poly_list.append(poly)
        for j in range(4):
            poly_beat = PolyBeat(
                step=i,
                voice=j,
                pitch="C3",
                duration="16n",
                velocity="100",
                poly=poly
            )
            poly_beat_list.append(poly_beat)


    db.session.bulk_save_objects(poly_list)
    db.session.bulk_save_objects(poly_beat_list)


    # poly0Beat0 = PolyBeat(
    #     step=0,
    #     voice=0,
    #     pitch="C3",
    #     duration="16n",
    #     velocity="100",
    #     poly=poly0
    # )
    # poly0Beat1 = PolyBeat(
    #     step=0,
    #     voice=1,
    #     pitch="C3",
    #     duration="16n",
    #     velocity="100",
    #     poly=poly0
    # )
    # poly0Beat2 = PolyBeat(
    #     step=0,
    #     voice=2,
    #     pitch="C3",
    #     duration="16n",
    #     velocity="100",
    #     poly=poly0
    # )
    # poly0Beat3 = PolyBeat(
    # step=0,
    # voice=3,
    # pitch="C3",
    # duration="16n",
    # velocity="100",
    # poly=poly0
    # )
    # drum_poly_beats = [poly0Beat0,poly0Beat1,poly0Beat2,poly0Beat3]
    # db.session.bulk_save_objects(drum_poly_beats)
    # mono_beats2 = [item for item in mono_beats]
    # drum_beats2 = [item for item in drum_beats]

    # mono_beats2 = [
    #     Beat(
    #         step=0,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=1,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=2,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=3,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=4,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=5,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=6,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=7,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=8,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=9,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=10,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=11,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=12,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=13,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=14,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     ),
    #     Beat(
    #         step=15,
    #         pitch="C3",
    #         duration="16n",
    #         velocity="100",
    #         synth=MonoSynth2
    #     )
    # ]
    #
    # drum_beats2 = [
    #     Beat(
    #         step=0,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=1,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=2,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=3,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=4,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=5,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=6,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=7,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=8,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=9,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=10,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=11,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=12,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=13,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=14,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     ),
    #     Beat(
    #         step=15,
    #         pitch="C2",
    #         duration="16n",
    #         velocity="100",
    #         synth=DrumMachine2
    #     )
    # ]



    # db.session.bulk_save_objects(mono_beats2)
    # db.session.bulk_save_objects(drum_beats2)
    db.session.commit()



print('Seeds sown 🌱')
