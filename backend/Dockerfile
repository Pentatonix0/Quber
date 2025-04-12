FROM python:3.11.9-slim

RUN pip install pipenv

COPY Pipfile Pipfile
RUN pipenv install --system --deploy

COPY . .

CMD ["python", "main.py"]