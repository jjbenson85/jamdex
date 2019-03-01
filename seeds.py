from app import app, db
from models.user import User, UserSchema
from models.jam import Jam
from models.synth import Synth
from models.beat import Beat


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

    james_jam_2 = Jam(jam_name='Jam 2', created_by=james, exported=False)
    james_jam_2.save()

    MonoSynth = Synth(synth_name='MonoSynth', jam=james_jam_1)
    MonoSynth.save()

    DrumMachine = Synth(synth_name='DrumMachine', jam=james_jam_1)
    DrumMachine.save()

    MonoSynth2 = Synth(synth_name='MonoSynth', jam=james_jam_2)
    MonoSynth2.save()

    DrumMachine2 = Synth(synth_name='DrumMachine', jam=james_jam_2)
    DrumMachine2.save()

    dex_jam_1 = Jam(jam_name='Super Dex', created_by=dex)
    dex_jam_1.save()

    mono_beats = [
        Beat(
            step=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=1,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=2,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=3,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=4,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=5,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=6,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=7,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=8,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=9,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=10,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=11,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=12,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=13,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=14,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        ),
        Beat(
            step=15,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth
        )
    ]
    drum_beats = [
        Beat(
            step=0,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=1,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=2,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=3,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=4,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=5,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=6,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=7,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=8,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=9,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=10,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=11,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=12,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=13,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=14,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=15,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        )
    ]

    # mono_beats2 = [item for item in mono_beats]
    # drum_beats2 = [item for item in drum_beats]

    mono_beats2 = [
        Beat(
            step=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=1,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=2,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=3,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=4,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=5,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=6,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=7,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=8,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=9,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=10,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=11,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=12,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=13,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=14,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        ),
        Beat(
            step=15,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=MonoSynth2
        )
    ]

    drum_beats2 = [
        Beat(
            step=0,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=1,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=2,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=3,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=4,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=5,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=6,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=7,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=8,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=9,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=10,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=11,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=12,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=13,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=14,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        ),
        Beat(
            step=15,
            pitch="C2",
            duration="16n",
            velocity="100",
            synth=DrumMachine2
        )
    ]


    db.session.bulk_save_objects(mono_beats)
    db.session.bulk_save_objects(drum_beats)
    db.session.bulk_save_objects(mono_beats2)
    db.session.bulk_save_objects(drum_beats2)
    db.session.commit()



print('Seeds sown 🌱')
