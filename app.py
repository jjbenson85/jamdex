from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt


app = Flask(__name__, static_folder='dist')

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost:5432/jamdex'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)


#pylint: disable=W0611,C0413
from config import routes
