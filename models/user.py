from app import db, ma
from .base import BaseModel, BaseSchema

class User(db.Model, BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(64), nullable=False)
    password_hash = db.Column(db.String(128), nullable=True)

class UserSchema(ma.ModelSchema, BaseSchema):

    class Meta:
        model = User
        exclude = ('password_hash', )
