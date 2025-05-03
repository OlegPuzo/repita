from sqlalchemy import Column, Integer, String, DateTime
from .database import Base
import datetime
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import datetime


Base = declarative_base()
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    entity_id = Column(Integer, nullable = False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="student")  # Возможные роли: student, teacher, admin
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)



# Сущность "Ставка"
class Rate(Base):
    __tablename__ = "rates"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    cost = Column(Float, nullable=False)
    payment_method = Column(String, nullable=False)  # "hourly" или "monthly"
    
    teachers = relationship("Teacher", back_populates="rate")

# Сущность "Преподаватель"
class Teacher(Base):
    __tablename__ = "teachers"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    rate_id = Column(Integer, ForeignKey("rates.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    rate = relationship("Rate", back_populates="teachers")
    students = relationship("Student", back_populates="teacher")
    lessons = relationship("Lesson", back_populates="teacher")

# Сущность "Менеджер"
class Manager(Base):
    __tablename__ = "managers"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# Сущность "Урок"
class Lesson(Base):
    __tablename__ = "lessons"
    id = Column(Integer, primary_key=True, index=True)
    scheduled_at = Column(DateTime, nullable=False)  # Дата и время проведения
    duration = Column(Integer, nullable=False)       # Длительность в минутах
    cost = Column(Float, nullable=False)
    recurring = Column(Boolean, default=False)         # Повторяющийся урок или нет
    recurrence_days = Column(String, nullable=True)    # Например, "Mon,Wed,Fri"
    recurrence_end_date = Column(DateTime, nullable=True) 
    teacher_id = Column(Integer, ForeignKey("teachers.id"), nullable=False)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    subscription_id = Column(Integer, ForeignKey("subscriptions.id"), nullable=True)
    lesson_direction = Column(String, nullable=False)
    record_link = Column(Text, nullable = True)
    homework = Column(Text, nullable = True)
    connect_link = Column(Text, nullable = True)
    
    teacher = relationship("Teacher", back_populates="lessons")
    student = relationship("Student", back_populates="lessons")
    subscription = relationship("Subscription", back_populates="lessons")

# Сущность "Абонемент"
class Subscription(Base):
    __tablename__ = "subscriptions"
    id = Column(Integer, primary_key=True, index=True)
    lessons_count = Column(Integer, nullable=False)  # Количество занятий
    cost = Column(Float, nullable=False)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    
    student = relationship("Student", back_populates="subscriptions")
    lessons = relationship("Lesson", back_populates="subscription")

# Сущность "Ученик"
class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    teacher_id = Column(Integer, ForeignKey("teachers.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    teacher = relationship("Teacher", back_populates="students")
    lessons = relationship("Lesson", back_populates="student")
    subscriptions = relationship("Subscription", back_populates="student")
