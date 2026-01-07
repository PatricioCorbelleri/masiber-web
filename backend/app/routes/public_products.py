from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(prefix="/public/products", tags=["public-products"])


@router.get("/", response_model=list[schemas.ProductPublicOut])
def list_public_products(db: Session = Depends(get_db)):
    return crud.list_products(db)


@router.get("/search", response_model=list[schemas.ProductPublicOut])
def search_public_products(
    q: str | None = None,
    category_id: int | None = None,
    brand_id: int | None = None,
    db: Session = Depends(get_db),
):
    return crud.search_products(
        db=db,
        q=q,
        category_id=category_id,
        brand_id=brand_id,
    )
