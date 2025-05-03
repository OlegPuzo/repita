from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/attendance")
def attendance_report(db: Session = Depends(get_db)):
    # Заглушка для отчёта по посещаемости
    return {"report": "Данные по посещаемости"}

@router.get("/payments")
def payments_report(db: Session = Depends(get_db)):
    # Заглушка для отчёта по платежам
    return {"report": "Данные по платежам"}
