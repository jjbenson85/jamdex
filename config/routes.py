from app import app
from controllers import users, jams, synths, beats

app.register_blueprint(users.api, url_prefix='/api')
app.register_blueprint(jams.api, url_prefix='/api')
app.register_blueprint(synths.api, url_prefix='/api')
app.register_blueprint(beats.api, url_prefix='/api')
