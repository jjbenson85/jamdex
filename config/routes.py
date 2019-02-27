from app import app
from controllers import users, jams, synths

app.register_blueprint(users.api, url_prefix='/api')
app.register_blueprint(jams.api, url_prefix='/api')
app.register_blueprint(synths.api, url_prefix='/api')
