import requests
from flask import jsonify

class Judge0API:

    url = "http://147.45.231.194:2358"

    @classmethod
    def createSubmission(cls, body):
        headers = {'Content-Type': 'application/json'}
        response = requests.post(
            f"{cls.url}/submissions/?base64_encoded=true&wait=false&fields=*", json=body, headers=headers)
        print(response)
        return response.json().get('token')

    @classmethod
    def getSubmission(cls, token):
        headers = {}
        response = requests.get(
            f"{cls.url}/submissions/{token}?base64_encoded=true&wait=false&fields=*", headers=headers)
        return response.json()