from sqlalchemy.orm import Session
from sqlalchemy import select
from . import models, schemas
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext
from fastapi import Depends
from app.database import SessionLocal

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# --- CRUD для преподавателя ---
def create_teacher(db: Session, teacher: schemas.TeacherCreate):
    hashed_password = get_password_hash(teacher.password)
    db_teacher = models.Teacher(
        first_name=teacher.first_name,
        last_name=teacher.last_name,
        phone=teacher.phone,
        email=teacher.email,
        hashed_password=hashed_password,
        rate_id=teacher.rate_id
    )
    db.add(db_teacher)
    db.commit()
    db.refresh(db_teacher)
    return db_teacher

def get_teacher(db: Session, teacher_id: int):
    print(teacher_id)
    return db.query(models.Teacher).filter(models.Teacher.id == teacher_id).first()

def update_teacher(db: Session, teacher_id: int, teacher_data: schemas.TeacherUpdate):
    db_teacher = get_teacher(db, teacher_id)
    if not db_teacher:
        return None
    update_data = teacher_data.dict(exclude_unset=True)
    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
    for key, value in update_data.items():
        setattr(db_teacher, key, value)
    db.commit()
    db.refresh(db_teacher)
    return db_teacher

def delete_teacher(db: Session, teacher_id: int):
    db_teacher = get_teacher(db, teacher_id)
    if not db_teacher:
        return None
    db.delete(db_teacher)
    db.commit()
    return db_teacher

# --- CRUD для ученика ---
def create_student(db: Session, student: schemas.StudentCreate):
    hashed_password = get_password_hash(student.password)
    db_student = models.Student(
        first_name=student.first_name,
        last_name=student.last_name,
        phone=student.phone,
        email=student.email,
        hashed_password=hashed_password,
        teacher_id=student.teacher_id
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def get_student(db: Session, student_id: int):
    return db.query(models.Student).filter(models.Student.id == student_id).first()

def update_student(db: Session, student_id: int, student_data: schemas.StudentUpdate):
    db_student = get_student(db, student_id)
    if not db_student:
        return None
    update_data = student_data.dict(exclude_unset=True)
    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
    for key, value in update_data.items():
        setattr(db_student, key, value)
    db.commit()
    db.refresh(db_student)
    return db_student

def delete_student(db: Session, student_id: int):
    db_student = get_student(db, student_id)
    if not db_student:
        return None
    db.delete(db_student)
    db.commit()
    return db_student

# --- CRUD для менеджера ---
def create_manager(db: Session, manager: schemas.ManagerCreate):
    hashed_password = get_password_hash(manager.password)
    db_manager = models.Manager(
        first_name=manager.first_name,
        last_name=manager.last_name,
        phone=manager.phone,
        email=manager.email,
        hashed_password=hashed_password
    )
    db.add(db_manager)
    db.commit()
    db.refresh(db_manager)
    return db_manager

def get_manager(db: Session, manager_id: int):
    return db.query(models.Manager).filter(models.Manager.id == manager_id).first()

def update_manager(db: Session, manager_id: int, manager_data: schemas.ManagerUpdate):
    db_manager = get_manager(db, manager_id)
    if not db_manager:
        return None
    update_data = manager_data.dict(exclude_unset=True)
    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
    for key, value in update_data.items():
        setattr(db_manager, key, value)
    db.commit()
    db.refresh(db_manager)
    return db_manager

def delete_manager(db: Session, manager_id: int):
    db_manager = get_manager(db, manager_id)
    if not db_manager:
        return None
    db.delete(db_manager)
    db.commit()
    return db_manager

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def verify_password_no_hash(db:Session ,plain_password: str):
    return db.query(models.User).filter(models.User.hashed_password == plain_password).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_userr(password: str, email: str, phone: str, first_name: str, last_name: str, role: str):
    with SessionLocal() as session:
        if (role == "teacher"):
            teacher = models.Teacher(phone = phone, hashed_password = password, first_name = first_name, last_name = last_name, email = email)
            session.add(teacher)
            session.commit()
            session.refresh(teacher)
            e_id = teacher.id
        if (role == "student"):
            student = models.Student(phone = phone, hashed_password = password, first_name = first_name, last_name = last_name, email = email)
            session.add(student)
            session.commit()
            session.refresh(student)
            e_id = student.id
        if (role == "manager"):
            manager = models.Manager(phone = phone, hashed_password = password, first_name = first_name, last_name = last_name, email = email)
            session.add(manager)
            session.commit()
            session.refresh(manager)
            e_id = manager.id
        user = models.User(hashed_password = password, email = email, role = role, entity_id = e_id)
        print(user.entity_id)
        session.add(user)
        session.commit()
        session.refresh(user)
        return user

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def delete_user(db: Session, user_id: int):
    db_user = get_user(db, user_id)
    if not db_user:
        return None
    db.delete(db_user)
    if db_user.role == "teacher":
        print("suslik")
        delete_teacher(db, db_user.entity_id)
    if db_user.role == "student":
        print("bibbi")
        delete_teacher(db, db_user.entity_id)
    if db_user.role == "manager":
        print("kamish")
        delete_manager(db, db_user.entity_id)
    db.commit()
    return db_user

def get_users_from_role(db: Session, role:str):
    if role == "user":
        query = select(models.User) 
        result = db.execute(query) 
        users = result.scalars().all()
        print(users)
        return users
    if role == "student":
        query = select(models.Student) 
        result = db.execute(query) 
        users = result.scalars().all()
        print(users)
        return users
    if role == "manager":
        query = select(models.Manager) 
        result = db.execute(query) 
        users = result.scalars().all()
        print(users)
        return users
    if role == "teacher":
        query = select(models.Teacher) 
        result = db.execute(query) 
        users = result.scalars().all()
        print(users)
        return users
# print(create_userr("12345", "abeb@gmail.com", "426226", "adsfgasdg", "asdfasdg", "student"))

# def create_userr(session: Session, password: str, email: str, phone: str, first_name: str, last_name: str, role: str):
#     if role == "teacher":
#         teacher = models.Teacher(phone=phone, hashed_password=password, first_name=first_name, last_name=last_name, email=email)
#         session.add(teacher)  # Add the teacher to the session
#         session.commit()
#         session.refresh(teacher)  # Refresh to get the ID
#         e_id = teacher.id
#     elif role == "student":
#         student = models.Student(phone=phone, hashed_password=password, first_name=first_name, last_name=last_name, email=email)
#         session.add(student)  # Add the student to the session
#         session.commit()
#         session.refresh(student)  # Refresh to get the ID
#         e_id = student.id
#     elif role == "manager":
#         manager = models.Manager(phone=phone, hashed_password=password, first_name=first_name, last_name=last_name, email=email)
#         session.add(manager)  # Add the manager to the session
#         session.commit()
#         session.refresh(manager)  # Refresh to get the ID
#         e_id = manager.id
#     else:
#         raise ValueError("Invalid role specified")

#     user = models.User(hashed_password=password, email=email, role=role, entity_id=e_id)
#     session.add(user)  # Add the user to the session
#     session.commit()
#     session.refresh(user)  # Refresh to get the updated user object
#     return user
