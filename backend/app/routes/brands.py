from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(prefix="/brands", tags=["brands"])


@router.get("/", response_model=list[schemas.BrandOut])
def list_brands(db: Session = Depends(get_db)):
    return crud.list_brands(db)


@router.post("/", response_model=schemas.BrandOut)
def create_brand(brand: schemas.BrandCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_brand(db, brand)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{brand_id}")
def delete_brand(brand_id: int, db: Session = Depends(get_db)):
    ok = crud.delete_brand(db, brand_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Marca no encontrada")
    return {"ok": True}
