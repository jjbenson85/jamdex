from app import app
from controllers import users

app.register_blueprint(users.api, url_prefix='/api')
