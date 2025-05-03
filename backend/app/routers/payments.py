from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_payment(payment: schemas.PaymentCreate, db: Session = Depends(get_db)):
    # Заглушка для создания платежа
    return {"message": "Платеж успешно создан"}
