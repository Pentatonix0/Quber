from flask import request, jsonify
from flask_restx import Resource
from ..models.quest_model import QuestDTO
from application.services.quest_service import QuestService
from flask_jwt_extended import jwt_required, get_jwt_identity

quest_ns = QuestDTO.api
quest_model = QuestDTO.quest_model
task_model = QuestDTO.task_model
solution_model = QuestDTO.solution_model


@quest_ns.route('/create-quest')
class CreateQuest(Resource):
    @quest_ns.expect(quest_model)
    @jwt_required()
    def post(self):
        data = request.json
        return QuestService.create_quest(data)


@quest_ns.route('/<int:author_id>/get-all-created-quests')
class GetAllCreatedQuests(Resource):
    @jwt_required()
    @quest_ns.marshal_list_with(quest_model)
    def get(self, author_id):
        username = get_jwt_identity()
        return QuestService.get_all_created_quests(author_id, username)


@quest_ns.route('/<int:quest_id>/get-all-quest-tasks')
class GetAllQuestsTasks(Resource):
    @jwt_required()
    @quest_ns.marshal_list_with(task_model)
    def get(self, quest_id):
        return QuestService.get_all_quest_tasks(quest_id)


@quest_ns.route('/<int:quest_id>/create-task')
class СreateTask(Resource):
    @jwt_required()
    @quest_ns.marshal_with(task_model)
    def post(self, quest_id):
        return QuestService.create_task(quest_id)


@quest_ns.route('/<int:quest_id>/get-author-id')
class GetAuthorId(Resource):
    @jwt_required()
    def get(self, quest_id):
        return QuestService.get_author_id(quest_id)


@quest_ns.route('/<int:quest_id>/update-task')
class UpdateTask(Resource):
    @jwt_required()
    def post(self, quest_id):
        username = get_jwt_identity()
        data = request.json
        return QuestService.update_task(quest_id, data, username)


@quest_ns.route('/get-solutions/<int:quest_id>/<int:user_id>')
class GetSolutions(Resource):
    @quest_ns.marshal_list_with(solution_model)
    @jwt_required()
    def get(self, quest_id, user_id):
        username = get_jwt_identity()
        solutions = QuestService.get_solutions(quest_id, user_id, username)
        return solutions


@quest_ns.route('/submit-solution/<int:task_id>/<int:user_id>')
class SubmitSolution(Resource):
    @quest_ns.marshal_with(solution_model)
    @jwt_required()
    def post(self, task_id, user_id):
        username = get_jwt_identity()
        data = request.json
        return QuestService.submit_solution(task_id, user_id, username, data)


@quest_ns.route('/check-solution/<int:solution_id>/<int:user_id>')
class CheckSolution(Resource):
    @quest_ns.marshal_with(solution_model)
    @jwt_required()
    def get(self, solution_id, user_id):
        username = get_jwt_identity()
        solution = QuestService.check_status(solution_id, user_id, username)
        return solution


@quest_ns.route('/add-participant/<string:invite_code>/<int:user_id>')
class AddParticipant(Resource):
    @jwt_required()
    def post(self, invite_code, user_id):
        username = get_jwt_identity()
        return QuestService.add_participant(invite_code, user_id, username)

@quest_ns.route('/get-all-user-quests/<int:user_id>')
class GetAllUserQuests(Resource):
    @jwt_required()
    @quest_ns.marshal_list_with(quest_model)
    def get(self, user_id):
        username = get_jwt_identity()
        return QuestService.get_all_user_quests(user_id, username)


