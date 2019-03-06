from flask import Blueprint, jsonify, request, g
from models.user import User, UserSchema
from lib.secure_route import secure_route

user_schema = UserSchema()
users_schema = UserSchema(many=True)
partial_schema = UserSchema(partial=True)

api = Blueprint('users', __name__)

@api.route('/users', methods=['GET'])
@secure_route
def index():
    users = User.query.all()
    return users_schema.jsonify(users)

@api.route('/me', methods=['GET'])
@secure_route
def me():
    return user_schema.jsonify(g.current_user)

@api.route('/users/<int:user_id>', methods=['GET'])
def show(user_id):
    user = User.query.get(user_id)
    return user_schema.jsonify(user)

@api.route('/users/<int:user_id>', methods=['PUT'])
def update(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'Not found'}), 404

    user, errors = user_schema.load(request.get_json(), instance=user)
    if errors:
        return jsonify(errors), 422

    user.save()

    return user_schema.jsonify(user), 200
