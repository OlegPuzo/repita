from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, schedule, payments, materials, chat, reports, admin
from .database import engine
from .models import Base
from .crud import create_userr

# Для разработки можно использовать открытые настройки, в production следует ограничить домены.
origins = [
    "http://localhost:3000",
    # Добавьте другие допустимые домены
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Автоматически создаём таблицы (только для разработки)
Base.metadata.create_all(bind=engine)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(schedule.router, prefix="/api/schedule", tags=["schedule"])
app.include_router(payments.router, prefix="/api/payments", tags=["payments"])
app.include_router(materials.router, prefix="/api/materials", tags=["materials"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(reports.router, prefix="/api/reports", tags=["reports"])
app.include_router(admin.router, prefix="/api", tags=["admin"])
# app.include_router(admin.router, prefix="/api/admin/rates", tags=["rates"])


@app.get("/")
async def root():
    return {"message": "Добро пожаловать в API онлайн-школы Repita"}
