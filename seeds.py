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

    # james = User(username='Jam_Master_Jim', email='jjbenson85@gmail.com')
    # james.save()

    # dex = User(username='Funk_Master_Dex', email='contact@dexdeleon.com')
    # dex.save()

    james_jam_1 = Jam(jam_name='Super Jam', created_by=james)
    # james_jam_1 = Jam(jam_name='Super Jam', tempo='120')
    james_jam_1.save()

    MonoSynth = Synth(synth_name='MonoSynth', jam=james_jam_1)
    MonoSynth.save()

    DrumMachine = Synth(synth_name='DrumMachine', jam=james_jam_1)
    DrumMachine.save()

    dex_jam_1 = Jam(jam_name='Super Dex', created_by=dex)
    # dex_jam_1 = Jam(jam_name='Super Jam', tempo='120')
    dex_jam_1.save()

    # DrumMachine = Synth(synth_name='Bass-ic', jam=dex_jam_1)
    # DrumMachine.save()

    beats = [
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


    beats2 = [
        Beat(
            step=0,
            pitch="E4",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=1,
            pitch="B0",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=2,
            pitch="B4",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=3,
            pitch="B0",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=4,
            pitch="A4",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=5,
            pitch="B0",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=6,
            pitch="B4",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=7,
            pitch="B0",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=8,
            pitch="E4",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=9,
            pitch="E0",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=10,
            pitch="B4",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=11,
            pitch="B0",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=12,
            pitch="A4",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=13,
            pitch="A0",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=14,
            pitch="B4",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        ),
        Beat(
            step=15,
            pitch="B0",
            duration="16n",
            velocity="100",
            synth=DrumMachine
        )
    ]

    db.session.bulk_save_objects(beats)
    db.session.bulk_save_objects(beats2)
    db.session.commit()



print('Seeds sown 🌱')
