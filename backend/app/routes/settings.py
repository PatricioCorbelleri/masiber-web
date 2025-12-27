from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud

router = APIRouter(prefix="/settings", tags=["settings"])

@router.get("/usd")
def get_usd_rate(db: Session = Depends(get_db)):
    return crud.init_settings(db)

@router.put("/usd")
def update_usd_rate(value: float, db: Session = Depends(get_db)):
    if value <= 0:
        raise HTTPException(400, "El valor debe ser mayor a 0")

    return crud.update_usd_rate(db, value)
