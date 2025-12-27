from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import schemas, crud

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=schemas.UserOut)
def login(data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, data.username)

    if not user or user.password != data.password:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    if not user.is_admin:
        raise HTTPException(status_code=403, detail="No autorizado")

    return user
