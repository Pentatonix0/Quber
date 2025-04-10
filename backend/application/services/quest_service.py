import secrets
from datetime import datetime
from application.services.db_service import DBService
from application.services.code_service import CodeService


class QuestService:
    @staticmethod
    def create_quest(data):
        try:
            title = data.get('title')
            author_id = data.get('author_id')
            invite_code = secrets.token_hex(16)
            quest = DBService.create_quest(title, author_id, invite_code)
            QuestService.create_participant(quest.id, author_id)
            task = QuestService.create_default_task(quest.id)
            for participant in quest.participants:
                QuestService.create_default_solution(task.id, participant.id)
            response_object = {
                'status': 'success',
                'message': 'Quest successfully created'
            }
            return response_object, 201
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def get_all_created_quests(author_id, username):
        try:
            if not DBService.check_username_id(username, author_id):
                response_object = {
                    'status': 'fail',
                    'message': 'You can not get this quests'
                }
                return response_object, 401
            quests = DBService.get_all_created_quests(author_id)
            return sorted(quests, key=lambda x: x.created_at, reverse=True), 200
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def get_all_user_quests(user_id, username):
        try:
            if not DBService.check_username_id(username, user_id):
                response_object = {
                    'status': 'fail',
                    'message': 'You can not get this quests'
                }
                return response_object, 401
            quest_participations = DBService.get_user_quest_partisipations(user_id)
            quests = [p.quest for p in quest_participations]
            return sorted(quests, key=lambda x: x.created_at, reverse=True), 200
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def create_default_task(quest_id):
        description = "<p>Вы можете изменить описание</p>"
        is_blank_page = False
        languages = [
            45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
            58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 69, 70,
            71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 83,
            84, 85, 86, 87, 88
        ]
        compiler_settings = {"cpu_time_limit": 5, "memory_limit": 128000, "stack_limit": 64000,
                             "max_processes_and_or_threads": 60}
        tests = [{"stdin": "", "stdout": ""}]
        sample_count = 1
        points = 1

        return DBService.create_task(description, is_blank_page, quest_id, languages, compiler_settings, tests,
                                     sample_count, points)

    @staticmethod
    def create_task(quest_id):
        try:
            task = QuestService.create_default_task(quest_id)
            quest = task.quest
            for participant in quest.participants:
                QuestService.create_default_solution(task.id, participant.id)
            return task
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def get_all_quest_tasks(quest_id):
        try:
            tasks = DBService.get_all_quest_tasks(quest_id)
            return tasks, 200
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def get_author_id(quest_id):
        try:
            author_id = DBService.get_quest_author_id(quest_id)
            response_object = {'status': 'success',
                               'author_id': author_id}
            return response_object, 200
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def update_task(quest_id, data, username):
        try:
            author_id = DBService.get_quest_author_id(quest_id)
            if not DBService.check_username_id(username, author_id):
                response_object = {
                    'status': 'fail',
                    'message': 'You do not have rights to edit tasks'
                }
                return response_object, 400
            task_id = data.get('task_id')
            description = data.get('description')
            is_blank_page = data.get('is_blank_page')
            languages = data.get('languages')
            compiler_settings = data.get('compiler_settings')
            tests = data.get('tests')
            sample_count = data.get('sample_count')
            points = data.get('points')
            DBService.update_task(task_id, description, is_blank_page, languages, compiler_settings, tests,
                                  sample_count, points)
            response_object = {
                'status': 'success',
                'message': 'Task successfully updated'
            }
            return response_object, 201
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def create_participant(quest_id, user_id):
        author_id = DBService.get_quest_author_id(quest_id)
        is_author = user_id == author_id
        return DBService.create_participant(quest_id, user_id, is_author)

    @staticmethod
    def create_default_solution(task_id, participant_id):
        solution = DBService.create_default_solution(task_id, participant_id)
        DBService.create_actual_solution(task_id, participant_id, solution.id)
        return solution

    @staticmethod
    def get_solutions(quest_id, user_id, username):
        try:
            if not DBService.check_username_id(username, user_id):
                response_object = {
                    'status': 'fail',
                    'message': 'You do not have rights get this solutions'
                }
                return response_object, 400
            participant = DBService.get_participant(quest_id, user_id)
            actual_solutions = participant.actual_solutions
            print("==============================================")
            print(participant)
            print(actual_solutions)
            return [ac.solution for ac in actual_solutions]
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def submit_solution(task_id, user_id, username, data):
        try:
            if not DBService.check_username_id(username, user_id):
                response_object = {
                    'status': 'fail',
                    'message': 'You do not have rights get this solutions'
                }
                return response_object, 400
            participant_id = data.get("participant_id")
            source_code = data.get("source_code")
            selected_language = data.get('selected_language')
            participant = DBService.get_participant_by_id(participant_id)
            task = DBService.get_task(task_id)
            tokens = CodeService.start_testing(task.tests, source_code, selected_language, task.compiler_settings)
            solution = DBService.create_solution(task_id, participant_id, "testing", datetime.utcnow(), source_code,
                                                 selected_language, tokens)
            actual_solution = next((sol for sol in participant.actual_solutions if sol.task_id == task_id), None)
            DBService.update_actual_solution(actual_solution, solution.id)
            return solution
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def check_status(solution_id, user_id, username):
        try:
            if not DBService.check_username_id(username, user_id):
                response_object = {
                    'status': 'fail',
                    'message': 'You do not have rights get this solutions'
                }
                return response_object, 400
            solution = DBService.get_solution(solution_id)
            tokens = solution.tokens
            verdict = CodeService.check_tests(tokens)
            DBService.update_solution_after_testing(solution, verdict["status"], verdict["failed_test_number"],
                                                    verdict["test_details"])
            return solution
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def add_participant(invite_code, user_id, username):
        try:
            if not DBService.check_username_id(username, user_id):
                response_object = {
                    'status': 'fail',
                    'message': 'You do not have rights add participant'
                }
                return response_object, 400
            quest = DBService.get_quest_by_invite_code(invite_code)
            participant = DBService.get_participant(quest.id, user_id)

            if participant is not None:
                response_object = {
                    'status': 'warn',
                    'message': 'You are already paricipating'
                }
                return response_object, 200
            author_id = quest.author_id
            quest_id = quest.id
            is_author = author_id == user_id
            participant = DBService.create_participant(quest_id, user_id, is_author)
            for task in quest.tasks:
                QuestService.create_default_solution(task.id, participant.id)
            response_object = {
                'status': 'success',
                'message': 'Participant added'
            }
            return response_object, 201
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500
