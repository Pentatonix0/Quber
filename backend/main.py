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

CORS(app, origins="http://localhost:5173")

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


app.run()
