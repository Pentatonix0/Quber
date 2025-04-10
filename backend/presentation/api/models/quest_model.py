from flask_restx import Namespace, fields
from datetime import datetime
from ..models.code_models  import CodeDTO
responce_model = CodeDTO.response_model

class QuestDTO:
    api = Namespace('quests', description="A namespace for quests")

    quest_model = api.model(
        'Quest',
        {
            "title": fields.String(),
            "description": fields.String(),
            "id": fields.Integer(),
            "invite_code": fields.String()
        }
    )

    task_model = api.model(
        'Task',
        {
            "description": fields.String(),
            "is_blank_page": fields.Boolean(),
            "id": fields.Integer(),
            "languages": fields.Raw(),
            "compiler_settings": fields.Raw(),
            "tests": fields.Raw(),
            "sample_count": fields.Integer(),
            "points": fields.Integer(),
        }
    )

    solution_model = api.model("Solution", {
        "id": fields.Integer(),
        "participant_id": fields.Integer(),
        "task_id": fields.Integer(),
        "status": fields.String(),
        "failed_test_number": fields.Integer(),
        "test_details": fields.Nested(responce_model),
        "submitted_at": fields.DateTime(),
        "source_code": fields.String(),
        "selected_language_id": fields.Integer(),
        "is_author": fields.Boolean()
    })
