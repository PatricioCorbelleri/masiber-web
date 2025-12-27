from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy.exc import IntegrityError

from app.database import get_db
from app import crud, schemas
from app.models import Category
from app.deps.admin_auth import require_role
from app.models import AdminRole


router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("/", response_model=List[schemas.CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return crud.list_categories(db)


@router.get("/tree", response_model=List[schemas.CategoryTree])
def get_categories_tree(db: Session = Depends(get_db)):
    return crud.get_category_tree(db)



@router.post("/", response_model=schemas.CategoryOut)
def create_category(
    category: schemas.CategoryCreate,
    db: Session = Depends(get_db),
):
    try:
        return crud.create_category(db, category)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{category_id}", response_model=schemas.CategoryOut)
def update_category(
    category_id: int,
    category: schemas.CategoryUpdate,
    db: Session = Depends(get_db),
):
    try:
        db_category = crud.update_category(db, category_id, category)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if not db_category:
        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )

    return db_category


@router.delete("/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
):
    try:
        result = crud.delete_category(db, category_id)
    except IntegrityError:
        raise HTTPException(
            status_code=409,
            detail="No se puede eliminar la categoría porque tiene productos o subcategorías asociadas"
        )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )

    return {"message": "Categoría eliminada correctamente"}

# ------------------------------

@router.post(
    "/",
    response_model=schemas.CategoryOut,
    dependencies=[Depends(require_role(AdminRole.SUPER_ADMIN))]
)
def create_category(
    category: schemas.CategoryCreate,
    db: Session = Depends(get_db),
):
    try:
        return crud.create_category(db, category)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@router.put(
    "/{category_id}",
    response_model=schemas.CategoryOut,
    dependencies=[Depends(require_role(AdminRole.SUPER_ADMIN))]
)
def update_category(
    category_id: int,
    category: schemas.CategoryUpdate,
    db: Session = Depends(get_db),
):
    try:
        db_category = crud.update_category(db, category_id, category)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if not db_category:
        raise HTTPException(404, "Categoría no encontrada")

    return db_category


@router.delete(
    "/{category_id}",
    dependencies=[Depends(require_role(AdminRole.SUPER_ADMIN))]
)
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
):
    try:
        result = crud.delete_category(db, category_id)
    except IntegrityError:
        raise HTTPException(
            status_code=409,
            detail="No se puede eliminar la categoría porque tiene productos o subcategorías asociadas"
        )

    if not result:
        raise HTTPException(404, "Categoría no encontrada")

    return {"message": "Categoría eliminada correctamente"}

