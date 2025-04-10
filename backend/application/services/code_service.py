from ..api.judge0_api import Judge0API
from time import sleep
import base64
class CodeService:
    @staticmethod
    def run_code(data):
        token = Judge0API.createSubmission(data)
        sleep(0.1)
        responce = Judge0API.getSubmission(token)
        print(responce, responce["status"])
        while responce["status"]["id"] in [1, 2]:
            sleep(0.1)
            responce = Judge0API.getSubmission(token)
            print("---------------------------------")
            print(responce)
        return responce

    @staticmethod
    def start_testing(tests, source_code, language_id, compiler_settings):
        tokens = []
        for test in tests:
            body = {
                "source_code": source_code,
                "language_id": language_id,
                "stdin": test["stdin"],
                "expected_output": test["stdout"],
            }
            body.update(compiler_settings)
            token = Judge0API.createSubmission(body)
            tokens.append(token)
        return tokens

    @staticmethod
    def check_tests(tokens):
        for num, token in enumerate(tokens):
            submission = Judge0API.getSubmission(token)
            status_id = submission["status"]["id"]
            if status_id in [1, 2]:
                return {"status": "testing", "failed_test_number": None, "test_details": {}}
            elif status_id != 3:
                return {"status": "fail", "failed_test_number": num + 1, "test_details": submission}
        return {"status": "accepted", "failed_test_number": None, "test_details": submission}

