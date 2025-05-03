from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import jwt
from .. import schemas, crud
from ..database import SessionLocal
from ..config import settings

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Пользователь с таким email уже существует")
    return crud.create_userr(user.password, user.email, user.phone, user.first_name, user.last_name, user.role)

@router.post("/delete", response_model=schemas.UserResponse)
def delete(user: schemas.UserDelete, db: Session = Depends(get_db)):
    return crud.delete_user(db, user.id)

@router.post("/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    print(db_user)
    if not db_user or not crud.verify_password_no_hash(db,user.password):
        raise HTTPException(status_code=400, detail="Неверные учетные данные")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": db_user.email}, expires_delta=access_token_expires)
    print({"access_token": access_token, "token_type": "bearer", "role":db_user.role})
    return {"access_token": access_token, "token_type": "bearer", "role":db_user.role}

@router.post("/get_users")
def get_all_users(role: schemas.GetUser, db: Session = Depends(get_db)):
    return {"users": crud.get_users_from_role(db, role.role), "role_filter":role.role}
    

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt