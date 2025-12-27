from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app import crud, schemas

router = APIRouter(prefix="/tags", tags=["tags"])

@router.get("/", response_model=List[schemas.TagOut])
def get_tags(db: Session = Depends(get_db)):
    return crud.list_tags(db)

@router.post("/", response_model=schemas.TagOut)
def create_tag(tag: schemas.TagCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_tag(db, tag)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{tag_id}", response_model=schemas.TagOut)
def update_tag(tag_id: int, tag: schemas.TagCreate, db: Session = Depends(get_db)):
    db_tag = crud.update_tag(db, tag_id, tag)
    if not db_tag:
        raise HTTPException(404, "Tag no encontrado")
    return db_tag

@router.delete("/{tag_id}", response_model=schemas.TagOut)
def delete_tag(tag_id: int, db: Session = Depends(get_db)):
    db_tag = crud.delete_tag(db, tag_id)
    if not db_tag:
        raise HTTPException(404, "Tag no encontrado")
    return db_tag
