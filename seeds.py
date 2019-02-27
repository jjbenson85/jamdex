from app import app, db
from models.user import User
from models.jam import Jam

with app.app_context():
    db.drop_all()
    db.create_all()

    james = User(username='Jam_Master_Jim', email='jjbenson85@gmail.com')
    james.save()

    dex = User(username='Funk_Master_Dex', email='contact@dexdeleon.com')
    dex.save()

    jam_1 = Jam(jam_name='Super Jam', created_by=james)
    # jam_1 = Jam(jam_name='Super Jam', tempo='120')
    jam_1.save()


print('Seeds sown 🌱')
