from app import app
from controllers import users, jams

app.register_blueprint(users.api, url_prefix='/api')
app.register_blueprint(jams.api, url_prefix='/api')
