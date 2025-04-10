from datetime import timedelta, datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from application.services.db_service import DBService


class AuthService:
    @staticmethod
    def sign_up(data):
        try:
            username = data.get('username')
            name = data.get('name')
            password = data.get('password')

            user = DBService.create_user(username, name, password)
            access_token = create_access_token(identity=user.username, expires_delta=timedelta(weeks=1000))
            refresh_token = create_refresh_token(identity=user.username, expires_delta=timedelta(weeks=1000))
            response_object = {"access_token": access_token, "refresh_token": refresh_token, "user_id": user.id}
            return response_object, 201
        except ValueError:
            response_object = {'status': 'fail', "message": f"Пользователь {username} уже существует"}
            return response_object, 400
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def login(data):
        try:
            username = data.get('username')
            password = data.get('password')
            user = DBService.get_user_by_username(username)
            if user and check_password_hash(user.password, password):
                access_token = create_access_token(
                    identity=user.username, expires_delta=timedelta(weeks=1000))
                refresh_token = create_refresh_token(
                    identity=user.username, expires_delta=timedelta(weeks=1000))
                responce_object = {"access_token": access_token, "refresh_token": refresh_token,
                                   "user_id": user.id}
                return responce_object, 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'Wrong Login or Password'
                }
                return response_object, 401
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

