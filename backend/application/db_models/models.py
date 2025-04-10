from datetime import datetime
from sqlalchemy import UniqueConstraint
from exts import db


class BaseModel(db.Model):
    __abstract__ = True

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class User(BaseModel):
    """Модель пользователя"""
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    name = db.Column(db.String(564), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Связи
    created_quests = db.relationship("Quest", back_populates="author")
    quest_participations = db.relationship("QuestParticipant", back_populates="user")


class Quest(BaseModel):
    """Основная модель квеста"""
    __tablename__ = 'quests'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # start_time = db.Column(db.DateTime)
    # end_time = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    invite_code = db.Column(db.String(16), unique=True)

    # Связи
    author = db.relationship("User", back_populates="created_quests")
    participants = db.relationship("QuestParticipant", back_populates="quest")
    tasks = db.relationship("QuestTask", back_populates="quest")


class QuestParticipant(BaseModel):
    """Участники квеста"""
    __tablename__ = 'quest_participants'

    id = db.Column(db.Integer, primary_key=True)
    quest_id = db.Column(db.Integer, db.ForeignKey('quests.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    is_author = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(50), default='active')  # active/completed/failed/abandoned
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Связи
    quest = db.relationship("Quest", back_populates="participants")
    user = db.relationship("User", back_populates="quest_participations")
    solutions = db.relationship("UserQuestSolutions", back_populates="participant")
    actual_solutions = db.relationship("UserQuestActualSolutions", back_populates="participant")


class QuestTask(BaseModel):
    """Шаги (этапы) квеста"""
    __tablename__ = 'quest_tasks'

    id = db.Column(db.Integer, primary_key=True)
    quest_id = db.Column(db.Integer, db.ForeignKey('quests.id'), nullable=False)
    description = db.Column(db.Text)
    is_blank_page = db.Column(db.Boolean, nullable=False)
    languages = db.Column(db.JSON, nullable=False)
    compiler_settings = db.Column(db.JSON, nullable=False)
    tests = db.Column(db.JSON, nullable=False)
    sample_count = db.Column(db.Integer, nullable=False)
    points = db.Column(db.Integer, nullable=False)

    # Связи
    quest = db.relationship("Quest", back_populates="tasks")
    solutions_records = db.relationship("UserQuestSolutions", back_populates="task")

class UserQuestActualSolutions(BaseModel):
    __tablename__ = 'user_quest_actual_solutions'
    id = db.Column(db.Integer, primary_key=True)
    participant_id = db.Column(db.Integer, db.ForeignKey('quest_participants.id'), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('quest_tasks.id'), nullable=False)
    solution_id = db.Column(db.Integer, db.ForeignKey('user_quest_solutions.id'), nullable=False)

    solution = db.relationship("UserQuestSolutions", back_populates="actual_solution")
    participant = db.relationship("QuestParticipant", back_populates="actual_solutions")

class UserQuestSolutions(BaseModel):
    """Прогресс пользователя по шагам квеста"""
    __tablename__ = 'user_quest_solutions'

    id = db.Column(db.Integer, primary_key=True)
    participant_id = db.Column(db.Integer, db.ForeignKey('quest_participants.id'), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('quest_tasks.id'), nullable=False)
    is_author = db.Column(db.Boolean, default=False) # НЕ НУЖНО
    status = db.Column(db.Text, default='default')
    failed_test_number = db.Column(db.Integer)
    test_details = db.Column(db.JSON)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    source_code = db.Column(db.Text, default='')
    selected_language_id = db.Column(db.Integer)
    tokens = db.Column(db.JSON, default=[])

    # Связи
    participant = db.relationship("QuestParticipant", back_populates="solutions")
    task = db.relationship("QuestTask", back_populates="solutions_records")
    actual_solution = db.relationship("UserQuestActualSolutions", back_populates="solution")