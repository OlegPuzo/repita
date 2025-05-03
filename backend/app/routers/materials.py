from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from ..database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
async def upload_material(lesson_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Пример сохранения файла на сервере (для демонстрации)
    file_location = f"files/{file.filename}"
    with open(file_location, "wb+") as f:
        f.write(await file.read())
    return {"info": f"Файл '{file.filename}' сохранён по адресу '{file_location}'"}
