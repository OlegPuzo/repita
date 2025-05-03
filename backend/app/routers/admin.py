# backend/app/routers/admin.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import SessionLocal
from .. import schemas, models, crud

router = APIRouter(prefix="/admin", tags=["admin"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Эндпоинты для преподавателей ---
@router.get("/teachers", response_model=List[schemas.TeacherResponse])
def list_teachers(db: Session = Depends(get_db)):
    return db.query(models.Teacher).all()

@router.post("/teachers", response_model=schemas.TeacherResponse)
def create_teacher(teacher: schemas.TeacherCreate, db: Session = Depends(get_db)):
    db_teacher = db.query(models.Teacher).filter(models.Teacher.email == teacher.email).first()
    if db_teacher:
        raise HTTPException(status_code=400, detail="Преподаватель с таким email уже существует")
    # Здесь можно добавить проверку существования ставки по teacher.rate_id
    return crud.create_teacher(db, teacher)

@router.put("/teachers/{teacher_id}", response_model=schemas.TeacherResponse)
def update_teacher(teacher_id: int, teacher: schemas.TeacherUpdate, db: Session = Depends(get_db)):
    db_teacher = crud.get_teacher(db, teacher_id)
    if not db_teacher:
        raise HTTPException(status_code=404, detail="Преподаватель не найден")
    return crud.update_teacher(db, teacher_id, teacher)

@router.delete("/teachers/{teacher_id}")
def delete_teacher(teacher_id: int, db: Session = Depends(get_db)):
    db_teacher = crud.get_teacher(db, teacher_id)
    if not db_teacher:
        raise HTTPException(status_code=404, detail="Преподаватель не найден")
    crud.delete_teacher(db, teacher_id)
    return {"detail": "Преподаватель удалён"}

# --- Эндпоинты для учеников ---
@router.get("/students", response_model=List[schemas.StudentResponse])
def list_students(db: Session = Depends(get_db)):
    return db.query(models.Student).all()

@router.post("/students", response_model=schemas.StudentResponse)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    db_student = db.query(models.Student).filter(models.Student.email == student.email).first()
    if db_student:
        raise HTTPException(status_code=400, detail="Ученик с таким email уже существует")
    return crud.create_student(db, student)

@router.put("/students/{student_id}", response_model=schemas.StudentResponse)
def update_student(student_id: int, student: schemas.StudentUpdate, db: Session = Depends(get_db)):
    db_student = crud.get_student(db, student_id)
    if not db_student:
        raise HTTPException(status_code=404, detail="Ученик не найден")
    return crud.update_student(db, student_id, student)

@router.delete("/students/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    db_student = crud.get_student(db, student_id)
    if not db_student:
        raise HTTPException(status_code=404, detail="Ученик не найден")
    crud.delete_student(db, student_id)
    return {"detail": "Ученик удалён"}

# --- Эндпоинты для менеджеров ---
@router.get("/managers", response_model=List[schemas.ManagerResponse])
def list_managers(db: Session = Depends(get_db)):
    return db.query(models.Manager).all()

@router.post("/managers", response_model=schemas.ManagerResponse)
def create_manager(manager: schemas.ManagerCreate, db: Session = Depends(get_db)):
    db_manager = db.query(models.Manager).filter(models.Manager.email == manager.email).first()
    if db_manager:
        raise HTTPException(status_code=400, detail="Менеджер с таким email уже существует")
    return crud.create_manager(db, manager)

@router.put("/managers/{manager_id}", response_model=schemas.ManagerResponse)
def update_manager(manager_id: int, manager: schemas.ManagerUpdate, db: Session = Depends(get_db)):
    db_manager = crud.get_user(db, manager_id)
    if not db_manager:
        raise HTTPException(status_code=404, detail="Менеджер не найден")
    return crud.update_manager(db, manager_id, manager)

@router.delete("/managers/{manager_id}")
def delete_manager(manager_id: int, db: Session = Depends(get_db)):
    db_manager = crud.get_user(db, manager_id)
    if not db_manager:
        raise HTTPException(status_code=404, detail="Менеджер не найден")
    crud.delete_manager(db, manager_id)
    return {"detail": "Менеджер удалён"}

# --- Эндпоинты для ставок ---
@router.get("/rates", response_model=List[schemas.RateResponse])
def list_rates(db: Session = Depends(get_db)):
    return db.query(models.Rate).all()

@router.post("/rates", response_model=schemas.RateResponse)
def create_rate(rate: schemas.RateCreate, db: Session = Depends(get_db)):
    existing_rate = db.query(models.Rate).filter(models.Rate.title == rate.title).first()
    if existing_rate:
        raise HTTPException(status_code=400, detail="Ставка с таким названием уже существует")
    db_rate = models.Rate(**rate.dict())
    db.add(db_rate)
    db.commit()
    db.refresh(db_rate)
    return db_rate

@router.put("/rates/{rate_id}", response_model=schemas.RateResponse)
def update_rate(rate_id: int, rate: schemas.RateCreate, db: Session = Depends(get_db)):
    db_rate = db.query(models.Rate).filter(models.Rate.id == rate_id).first()
    if not db_rate:
        raise HTTPException(status_code=404, detail="Ставка не найдена")
    update_data = rate.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_rate, key, value)
    db.commit()
    db.refresh(db_rate)
    return db_rate

@router.delete("/rates/{rate_id}")
def delete_rate(rate_id: int, db: Session = Depends(get_db)):
    db_rate = db.query(models.Rate).filter(models.Rate.id == rate_id).first()
    if not db_rate:
        raise HTTPException(status_code=404, detail="Ставка не найдена")
    db.delete(db_rate)
    db.commit()
    return {"detail": "Ставка удалена"}
