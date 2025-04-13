FROM python:3.11.9-slim

RUN pip install pipenv
RUN pipenv shell

COPY Pipfile Pipfile
RUN pipenv install

COPY . .

CMD [ "python", "main.py" ]