from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# Схемы для пользователей
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    phone: str
    first_name : str
    last_name: str
    role : str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserDelete(BaseModel):
    id: int

class GetUser(BaseModel):
    role: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    role: str
    created_at: datetime

    class Config:
        orm_mode = True

# Схемы для авторизации
class Token(BaseModel):
    access_token: str
    token_type: str
    role: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Пример схемы для платежей
class PaymentCreate(BaseModel):
    amount: float
    type: str  # "single" или "subscription"




# --- Схемы для "Ставки" ---
class RateBase(BaseModel):
    title: str
    cost: str
    payment_method: str

class RateCreate(RateBase):
    pass

class RateResponse(RateBase):
    id: int
    class Config:
        orm_mode = True

# --- Схемы для "Преподавателя" ---
class TeacherBase(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: EmailStr
    rate_id: Optional[int] = None

class TeacherCreate(TeacherBase):
    password: str

class TeacherUpdate(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    phone: Optional[str]
    email: Optional[EmailStr]
    rate_id: Optional[int]
    password: Optional[str]

class TeacherResponse(TeacherBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

# --- Схемы для "Ученика" ---
class StudentBase(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: EmailStr
    teacher_id: Optional[int] = None

class StudentCreate(StudentBase):
    password: str

class StudentUpdate(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    phone: Optional[str]
    email: Optional[EmailStr]
    teacher_id: Optional[int]
    password: Optional[str]

class StudentResponse(StudentBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

# --- Схемы для "Менеджера" ---
class ManagerBase(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: EmailStr

class ManagerCreate(ManagerBase):
    password: str

class ManagerUpdate(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    phone: Optional[str]
    email: Optional[EmailStr]
    password: Optional[str]

class ManagerResponse(ManagerBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

# --- Схемы для "Урока" ---
class LessonBase(BaseModel):
    scheduled_at: datetime
    duration: int
    cost: float
    cost_type: str
    recurring: bool = False
    recurrence_days: Optional[str] = None
    recurrence_end_date: Optional[datetime] = None
    teacher_id: int
    student_id: int
    subscription_id: Optional[int] = None

class LessonCreate(LessonBase):
    pass

class LessonResponse(LessonBase):
    id: int
    class Config:
        orm_mode = True

# --- Схемы для "Абонемента" ---
class SubscriptionBase(BaseModel):
    lessons_count: int
    cost: float
    student_id: int

class SubscriptionCreate(SubscriptionBase):
    pass

class SubscriptionResponse(SubscriptionBase):
    id: int
    class Config:
        orm_mode = True
