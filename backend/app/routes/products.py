from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session, joinedload
from typing import List
import os
import uuid
from sqlalchemy import or_

from app import crud, schemas
from app.database import get_db
from app.models import Product, Category, Brand

from app.schemas import (
    BulkUpdateRequest,
    BulkPreviewResponse,
    BulkPreviewItem,
)
from app.utils.pricing import apply_bulk_change, calculate_price


router = APIRouter(prefix="/products", tags=["products"])

# =========================
# SEARCH
# =========================

@router.get("/search")
def search_products(
    q: str | None = None,
    category_id: int | None = None,
    brand: str | None = None,          # 👈 NUEVO
    condition: str | None = None,
    page: int = 1,
    limit: int = 12,
    db: Session = Depends(get_db),
):
    query = (
        db.query(Product)
        .options(
            joinedload(Product.category),
            joinedload(Product.brand),   # 👈 importante para evitar N+1
        )
    )

    # 🔎 TEXTO
    if q:
        query = query.filter(
            or_(
                Product.name.ilike(f"%{q}%"),
                Product.description.ilike(f"%{q}%"),
            )
        )

    # 📂 CATEGORÍA (padre + hijos)
    if category_id:
        child_ids = (
            db.query(Category.id)
            .filter(
                (Category.id == category_id)
                | (Category.parent_id == category_id)
            )
            .subquery()
        )
        query = query.filter(Product.category_id.in_(child_ids))

    # 🏷️ MARCA (FIX REAL)
    if brand:
        query = (
            query
            .join(Product.brand)
            .filter(Brand.name.ilike(f"%{brand}%"))
        )

    # ⚙️ ESTADO
    if condition:
        query = query.filter(Product.condition == condition)

    total = query.count()

    products = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "items": products,
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit,
    }

# =========================
# CONFIG
# =========================

IMAGE_UPLOAD_DIR = "media/images/products"
VIDEO_UPLOAD_DIR = "media/videos/products"

MAX_IMAGES = 6
MAX_IMAGE_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_IMAGE_EXT = ["jpg", "jpeg", "png", "webp"]

ALLOWED_VIDEO_EXT = ["mp4", "webm", "mov"]
MAX_VIDEO_SIZE = 50 * 1024 * 1024  # 50MB

# =========================
# PRODUCTS
# =========================

@router.post("/", response_model=schemas.ProductOut)
def create_product(
    product: schemas.ProductCreate,
    db: Session = Depends(get_db),
):
    category = db.query(Category).filter(
        Category.id == product.category_id
    ).first()

    if not category:
        raise HTTPException(status_code=400, detail="Categoría inválida")

    if category.children:
        raise HTTPException(
            status_code=400,
            detail="No se puede asignar un producto a una categoría padre"
        )

    return crud.create_product(db, product)


# 🔴 SIN response_model A PROPÓSITO
@router.get("/")
def read_products(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    return crud.list_products(db, skip=skip, limit=limit)


@router.get("/{product_id}", response_model=schemas.ProductOut)
def read_product(product_id: int, db: Session = Depends(get_db)):
    dbp = crud.get_product(db, product_id)
    if not dbp:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return dbp


@router.put("/{product_id}", response_model=schemas.ProductOut)
def update_product(
    product_id: int,
    product: schemas.ProductUpdate,
    db: Session = Depends(get_db),
):
    if product.category_id is not None:
        category = db.query(Category).filter(
            Category.id == product.category_id
        ).first()

        if not category:
            raise HTTPException(status_code=400, detail="Categoría inválida")

        if category.children:
            raise HTTPException(
                status_code=400,
                detail="No se puede asignar un producto a una categoría padre"
            )

    dbp = crud.update_product(db, product_id, product)
    if not dbp:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    return dbp


@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    dbp = crud.delete_product(db, product_id)
    if not dbp:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"message": "Producto eliminado"}

# =========================
# IMÁGENES (NO TOCAR)
# =========================

@router.post("/{product_id}/images")
async def upload_product_images(
    product_id: int,
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(404, "Producto no encontrado")

    current_images = product.images or []

    if len(current_images) + len(files) > MAX_IMAGES:
        raise HTTPException(400, "Máximo 6 imágenes por producto")

    os.makedirs(IMAGE_UPLOAD_DIR, exist_ok=True)

    new_images = []

    for file in files:
        ext = file.filename.split(".")[-1].lower()
        if ext not in ALLOWED_IMAGE_EXT:
            raise HTTPException(400, "Formato de imagen no permitido")

        content = await file.read()
        if len(content) > MAX_IMAGE_SIZE:
            raise HTTPException(400, "Imagen demasiado grande (máx 5MB)")

        filename = f"{uuid.uuid4()}.{ext}"
        filepath = os.path.join(IMAGE_UPLOAD_DIR, filename)

        with open(filepath, "wb") as f:
            f.write(content)

        new_images.append(f"/media/images/products/{filename}")

    product.images = current_images + new_images
    db.commit()
    db.refresh(product)

    return {"message": "Imágenes cargadas correctamente", "images": product.images}

# =========================
# VIDEO (NO TOCAR)
# =========================

@router.post("/{product_id}/video")
async def upload_product_video(
    product_id: int,
    video: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(404, "Producto no encontrado")

    ext = video.filename.split(".")[-1].lower()
    if ext not in ALLOWED_VIDEO_EXT:
        raise HTTPException(400, "Formato de video no permitido")

    content = await video.read()
    if len(content) > MAX_VIDEO_SIZE:
        raise HTTPException(400, "Video demasiado grande (máx 50MB)")

    os.makedirs(VIDEO_UPLOAD_DIR, exist_ok=True)

    filename = f"{product_id}.{ext}"
    filepath = os.path.join(VIDEO_UPLOAD_DIR, filename)

    with open(filepath, "wb") as f:
        f.write(content)

    product.video = f"/media/videos/products/{filename}"
    db.commit()
    db.refresh(product)

    return {"message": "Video cargado correctamente", "video": product.video}

@router.delete("/{product_id}/video")
def delete_product_video(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product or not product.video:
        raise HTTPException(404, "Video no encontrado")

    file_path = product.video.lstrip("/")
    if os.path.exists(file_path):
        os.remove(file_path)

    product.video = None
    db.commit()
    db.refresh(product)

    return {"message": "Video eliminado"}

# =========================
# BULK PREVIEW
# =========================

@router.post("/bulk-preview", response_model=BulkPreviewResponse)
def bulk_preview(data: BulkUpdateRequest, db: Session = Depends(get_db)):
    q = db.query(Product)

    if data.brand_id:
        q = q.filter(Product.brand_id == data.brand_id)

    if data.category_id:
        q = q.filter(Product.category_id == data.category_id)

    TOTAL_LIMIT = 50

    total = q.count()
    products = q.limit(TOTAL_LIMIT).all()

    items = []

    for p in products:
        current = getattr(p, data.field, None)

        new_value = apply_bulk_change(
            current,
            data.action,
            data.type,
            data.value,
        )

        items.append(
            BulkPreviewItem(
                id=p.id,
                name=p.name,
                old_value=current,
                new_value=new_value,
                diff=(
                    new_value - current
                    if current is not None and new_value is not None
                    else None
                ),
            )
        )

    return BulkPreviewResponse(
        total=total,
        items=items,
    )

# =========================
# BULK UPDATE
# =========================

@router.post("/bulk-update")
def bulk_update(data: BulkUpdateRequest, db: Session = Depends(get_db)):
    q = db.query(Product)

    if data.brand_id:
        q = q.filter(Product.brand_id == data.brand_id)

    if data.category_id:
        q = q.filter(Product.category_id == data.category_id)

    products = q.all()

    for p in products:
        current = getattr(p, data.field, None)

    # ⛔ Si no hay valor actual, no tocar
        if current is None:
            continue

        new_value = apply_bulk_change(
            current,
            data.action,
            data.type,
            data.value,
        )

    # ⛔ Si el cálculo falla, no tocar
        if new_value is None:
            continue

    setattr(p, data.field, new_value)

    # 🔄 Recalcular precio SOLO si corresponde
    if (
        p.cost_usd is not None
        and p.margin_value is not None
        and p.margin_type
    ):
        p.price_usd = calculate_price(
            p.cost_usd,
            p.margin_value,
            p.margin_type,
        )


    # for p in products:
    #     current = getattr(p, data.field, None)

    #     new_value = apply_bulk_change(
    #         current,
    #         data.action,
    #         data.type,
    #         data.value,
    #     )

    #     setattr(p, data.field, new_value)

    #    # Recalcular precio SOLO si hay datos válidos
    #     if p.cost_usd is not None and p.margin_value is not None and p.margin_type:
    #         p.price_usd = calculate_price(
    #             p.cost_usd,
    #             p.margin_value,
    #             p.margin_type,
    # )


    db.commit()

    return {"updated": len(products)}
