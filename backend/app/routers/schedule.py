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

@router.get("/")
def get_schedule(db: Session = Depends(get_db)):
    # Здесь можно вернуть расписание занятий для текущего пользователя
    return {"schedule": []}
