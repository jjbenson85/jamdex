from flask import Blueprint
from models.poly import Poly, PolySchema
from lib.secure_route import secure_route


poly_schema = PolySchema()
polys_schema = PolySchema(many=True)

api = Blueprint('polys', __name__)

@api.route('/polys', methods=['GET'])
@secure_route
def index():
    polys = Poly.query.all()
    return polys_schema.jsonify(polys)

@api.route('/polys/<int:poly_id>', methods=['GET'])
@secure_route
def show(poly_id):
    poly = Poly.query.get(poly_id)
    return poly_schema.jsonify(poly)
