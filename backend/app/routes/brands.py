from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Brand, Product
from sqlalchemy import exists

router = APIRouter(prefix="/brands", tags=["brands"])


@router.get("/")
def list_brands(db: Session = Depends(get_db)):
    return db.query(Brand).order_by(Brand.name).all()


@router.post("/")
def create_brand(data: dict, db: Session = Depends(get_db)):
    name = data.get("name", "").strip()
    if not name:
        raise HTTPException(status_code=400, detail="Nombre requerido")

    brand = Brand(name=name)
    db.add(brand)
    db.commit()
    db.refresh(brand)
    return brand


@router.put("/{brand_id}")
def update_brand(
    brand_id: int,
    data: dict,
    db: Session = Depends(get_db),
):
    brand = db.query(Brand).filter(Brand.id == brand_id).first()
    if not brand:
        raise HTTPException(status_code=404, detail="Marca no encontrada")

    brand.name = data.get("name", brand.name)
    db.commit()
    db.refresh(brand)
    return brand


@router.delete("/{brand_id}")
def delete_brand(brand_id: int, db: Session = Depends(get_db)):
    brand = db.query(Brand).filter(Brand.id == brand_id).first()

    if not brand:
        raise HTTPException(status_code=404, detail="Marca no encontrada")

    db.delete(brand)
    db.commit()

    return {"ok": True}
