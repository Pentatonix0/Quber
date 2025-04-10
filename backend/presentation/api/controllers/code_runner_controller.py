from flask import request
from flask_restx import Resource
from ..models.code_models import CodeDTO
from flask_jwt_extended import jwt_required
from time import sleep

from application.services.code_service import CodeService

code_ns = CodeDTO.api
code_model = CodeDTO.code_model
responce_model = CodeDTO.response_model

@code_ns.route('/run-code')
class CreateQuest(Resource):
    @code_ns.marshal_with(responce_model)
    @jwt_required()
    def post(self):
        data = request.get_json()
        print(data)
        return CodeService.run_code(data)
