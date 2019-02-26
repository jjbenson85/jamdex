from app import app, db
from models.user import User

with app.app_context():
    db.drop_all()
    db.create_all()

    jam = User(username='Jam_Master_Jim', email='jjbenson85@gmail.com')
    jam.save()

    dex = User(username='Funk_Master_Dex', email='contact@dexdeleon.com')
    dex.save()

print('Seeds sown 🌱')
