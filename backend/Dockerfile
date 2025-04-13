FROM python:3.11-slim

RUN pip install pipenv

COPY Pipfile Pipfile.lock* ./

RUN pipenv install --deploy --ignore-pipfile

COPY . .

ENV PATH="/root/.local/bin:$PATH"

CMD ["pipenv", "run", "python", "main.py"]
