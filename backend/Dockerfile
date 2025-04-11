FROM python:3.11.9-slim

WORKDIR /app

RUN pip install pipenv

COPY Pipfile Pipfile.lock ./
RUN pipenv install --system --deploy

COPY . .

VOLUME ["/app/backend"]

CMD ["python", "main.py"]
