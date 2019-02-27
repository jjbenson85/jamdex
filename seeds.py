from app import app, db
from models.user import User
from models.jam import Jam
from models.synth import Synth
from models.beat import Beat

with app.app_context():
    db.drop_all()
    db.create_all()

    james = User(username='Jam_Master_Jim', email='jjbenson85@gmail.com')
    james.save()

    dex = User(username='Funk_Master_Dex', email='contact@dexdeleon.com')
    dex.save()

    james_jam_1 = Jam(jam_name='Super Jam', created_by=james)
    # james_jam_1 = Jam(jam_name='Super Jam', tempo='120')
    james_jam_1.save()

    bassic_1 = Synth(synth_name='Bass-ic', jam=james_jam_1)
    bassic_1.save()

    dex_jam_1 = Jam(jam_name='Super Dex', created_by=dex)
    # dex_jam_1 = Jam(jam_name='Super Jam', tempo='120')
    dex_jam_1.save()

    bassic_2 = Synth(synth_name='Bass-ic', jam=dex_jam_1)
    bassic_2.save()

    beats = [
        Beat(
            step=0,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        ),
        Beat(
            step=1,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        ),
        Beat(
            step=2,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        ),
        Beat(
            step=3,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        ),
        Beat(
            step=4,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        ),
        Beat(
            step=5,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        ),
        Beat(
            step=6,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        ),
        Beat(
            step=7,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        ),
        Beat(
            step=8,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        ),
        Beat(
            step=9,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        ),
        Beat(
            step=10,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        ),
        Beat(
            step=11,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        ),
        Beat(
            step=12,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        ),
        Beat(
            step=14,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        ),
        Beat(
            step=15,
            pitch="C3",
            duration="16n",
            velocity="100",
            synth=bassic_1
        )
    ]


    beats2 = [
        Beat(
            step=0,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        ),
        Beat(
            step=1,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        ),
        Beat(
            step=2,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        ),
        Beat(
            step=3,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        ),
        Beat(
            step=4,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        ),
        Beat(
            step=5,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        ),
        Beat(
            step=6,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        ),
        Beat(
            step=7,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        ),
        Beat(
            step=8,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        ),
        Beat(
            step=9,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        ),
        Beat(
            step=10,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        ),
        Beat(
            step=11,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        ),
        Beat(
            step=12,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        ),
        Beat(
            step=14,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        ),
        Beat(
            step=15,
            pitch="D4",
            duration="16n",
            velocity="100",
            synth=bassic_2
        )
    ]

    db.session.bulk_save_objects(beats)
    db.session.bulk_save_objects(beats2)
    db.session.commit()



print('Seeds sown 🌱')
