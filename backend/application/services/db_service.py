from application.db_models.models import User
from datetime import datetime
from werkzeug.security import generate_password_hash
from application.db_models.models import Quest, QuestTask, QuestParticipant, UserQuestSolutions, \
    UserQuestActualSolutions
from flask import jsonify


class DBService:
    @staticmethod
    def create_user(username, name, password):
        db_user = User.query.filter_by(username=username).first()

        if db_user is not None:
            raise ValueError("User already exists")
        new_user = User(
            username=username,
            name=name,
            created_at=datetime.now(),
            password=generate_password_hash(password),
        )

        new_user.save()
        return new_user

    @staticmethod
    def get_user_by_username(username):
        db_user = User.query.filter_by(username=username).first()
        return db_user

    @staticmethod
    def create_quest(title, author_id, invite_code):
        quest = Quest(title=title, author_id=author_id, invite_code=invite_code, created_at=datetime.now())
        quest.save()
        return quest

    @staticmethod
    def check_username_id(username, user_id):
        user = User.query.filter_by(id=user_id).first()
        return user.username == username

    @staticmethod
    def get_all_created_quests(author_id):
        author = User.query.filter_by(id=author_id).first()
        return author.created_quests

    @staticmethod
    def get_user_quest_partisipations(user_id):
        user = User.query.filter_by(id=user_id).first()
        return [p for p in user.quest_participations if not p.is_author]

    @staticmethod
    def create_task(description, is_blank_page, quest_id, languages, compiler_settings, tests, sample_count, points):
        task = QuestTask(description=description, is_blank_page=is_blank_page, quest_id=quest_id, languages=languages,
                         compiler_settings=compiler_settings, tests=tests, sample_count=sample_count, points=points)
        task.save()
        return task

    @staticmethod
    def get_all_quest_tasks(quest_id):
        quest = Quest.query.filter_by(id=quest_id).first()
        return quest.tasks

    @staticmethod
    def get_quest_author_id(quest_id):
        quest = Quest.query.filter_by(id=quest_id).first()
        return quest.author_id

    @staticmethod
    def update_task(task_id, description, is_blank_page, languages, compiler_settings, tests, sample_count, points):
        task = QuestTask.query.filter_by(id=task_id).first()
        task.description = description
        task.is_blank_page = is_blank_page
        task.languages = languages
        task.compiler_settings = compiler_settings
        task.tests = tests
        task.sample_count = sample_count
        task.points = points
        task.save()

    @staticmethod
    def create_participant(quest_id, user_id, is_author):
        participant = QuestParticipant(quest_id=quest_id, user_id=user_id, is_author=is_author)
        participant.save()
        return participant

    @staticmethod
    def create_default_solution(task_id, participant_id):
        solution = UserQuestSolutions(task_id=task_id, participant_id=participant_id)
        solution.save()
        return solution

    @staticmethod
    def create_solution(task_id, participant_id, status, submitted_at, source_code, selected_language_id, tokens):
        solution = UserQuestSolutions(task_id=task_id, participant_id=participant_id, status=status,
                                      submitted_at=submitted_at, source_code=source_code,
                                      selected_language_id=selected_language_id, tokens=tokens)
        solution.save()
        return solution

    @staticmethod
    def create_actual_solution(task_id, participant_id, solution_id):
        actual_solution = UserQuestActualSolutions(participant_id=participant_id, task_id=task_id,
                                                   solution_id=solution_id)
        actual_solution.save()
        return actual_solution

    @staticmethod
    def get_participant(quest_id, user_id):
        participant = QuestParticipant.query.filter_by(quest_id=quest_id, user_id=user_id).first()
        return participant

    @staticmethod
    def get_participant_by_id(participant_id):
        participant = QuestParticipant.query.filter_by(id=participant_id).first()
        return participant

    @staticmethod
    def get_task(task_id):
        task = QuestTask.query.filter_by(id=task_id).first()
        return task

    @staticmethod
    def update_actual_solution(actual_solution, new_solution_id):
        actual_solution.solution_id = new_solution_id
        actual_solution.save()

    @staticmethod
    def get_solution(solution_id):
        solution = UserQuestSolutions.query.filter_by(id=solution_id).first()
        return solution

    @staticmethod
    def update_solution_after_testing(solution, status, failed_test_number, test_details):
        solution.status = status
        solution.failed_test_number = failed_test_number
        solution.test_details = test_details
        solution.save()

    @staticmethod
    def get_quest_by_invite_code(invite_code):
        quest = Quest.query.filter_by(invite_code=invite_code).first()
        return quest
