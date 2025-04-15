from flask import Flask
from flask_restx import Api, Namespace
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import DevConfig as config
from presentation.api.controllers.auth_controller import auth_ns
from presentation.api.controllers.quest_controller import quest_ns
from presentation.api.controllers.code_runner_controller import code_ns
from exts import db

app = Flask(__name__)
app.config.from_object(config)
app.config['JSON_AS_ASCII'] = False

CORS(app, origins=[
    "http://localhost:5173",
    "http://109.73.206.205",
    "http://pentatonix0.space"
], supports_credentials=True)


db.init_app(app)

migrate = Migrate(app, db)
JWTManager(app)

api = Api(app, doc='/docs')
api.add_namespace(auth_ns)
api.add_namespace(quest_ns)
api.add_namespace(code_ns)

@app.shell_context_processor
def make_shell_content():
    return {
        "db": db,
    }

# with app.app_context():
#     db.create_all()

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)