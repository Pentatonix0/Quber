FROM python:3.11.9-slim

RUN pip install pipenv

COPY Pipfile Pipfile.lock
RUN pipenv install

COPY . .

CMD [ "python", "main.py" ]