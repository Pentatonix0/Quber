from flask_restx import Namespace, fields


class AuthDTO:
    api = Namespace('auth', description="A namespace for authentification")
    signup_model = api.model(
        'SignUp',
        {
            "username": fields.String(),
            "name": fields.String(),
            "password": fields.String()

        }
    )

    login_model = api.model(
        'Login',
        {
            "username": fields.String(),
            "password": fields.String()

        }
    )

    user_model = api.model(
        'User',
        {
            "id": fields.Integer(),
            "username": fields.String(),
            "name": fields.String()
        }
    )
