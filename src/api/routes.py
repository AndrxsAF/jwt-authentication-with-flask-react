"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['GET'])
@jwt_required()
def user_access():
    user_token = get_jwt_identity()
    user = User.query.get(user_token)
    return jsonify(user.serialize()), 200

@api.route('/user/login', methods=['POST'])
def user_login():
    body = request.get_json(force=True)
    users = db.session.query(User).filter(User.email == body["email"]).first()
    if users is None:
        return jsonify("User doesn't exists."), 404
    if users.password == body["password"]:
        access_token = create_access_token(identity = users.id)
        return jsonify(access_token), 200
    return jsonify("Wrong email / password combination."), 401

@api.route('/user/register', methods=['POST'])
def user_register():
    body = request.get_json(force=True)
    users = db.session.query(User).filter(User.email == body["email"]).first()
    if users:
        return jsonify("Email already registered."), 401
    new_user = User(email=body["email"], password=body["password"], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify("User registered succesfully"), 201