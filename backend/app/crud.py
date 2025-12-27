from sqlalchemy.orm import Session, selectinload
from sqlalchemy import or_
from datetime import datetime
from sqlalchemy.exc import IntegrityError

from app.models import (
    Product,
    User,
    Settings,
    Category,
)
from app import schemas

# =========================
# HELPERS
# =========================

def is_leaf_category(db: Session, category_id: int) -> bool:
    """
    Devuelve True si la categoría NO tiene hijos.
    Es decir, es una categoría hoja.
    """
    children = (
        db.query(Category)
        .filter(Category.parent_id == category_id)
        .count()
    )
    return children == 0


# =========================
# PRODUCTS
# =========================

def list_products(db: Session, skip: int = 0, limit: int = 50):
    return (
        db.query(Product)
        .options(
            selectinload(Product.category)
        )
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_product(db: Session, product: schemas.ProductCreate):
    data = product.dict()

    # Asegurar imágenes
    data["images"] = data.get("images") or []

    # Validar categoría hoja
    category = db.query(Category).filter(Category.id == data["category_id"]).first()
    if not category:
        raise ValueError("Categoría inválida")

    if not is_leaf_category(db, category.id):
        raise ValueError("La categoría seleccionada no es una categoría final")

    db_product = Product(**data)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def get_product(db: Session, product_id: int):
    return (
        db.query(Product)
        .options(
            selectinload(Product.category)
        )
        .filter(Product.id == product_id)
        .first()
    )



def delete_product(db: Session, product_id: int):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        return None

    db.delete(product)
    db.commit()
    return product


def update_product(db: Session, product_id: int, product: schemas.ProductUpdate):
    db_product = db.query(Product).filter(Product.id == product_id).first()

    if not db_product:
        return None

    data = product.dict(exclude_unset=True)

    # Validar categoría hoja si viene
    if "category_id" in data:
        category = db.query(Category).filter(Category.id == data["category_id"]).first()
        if not category:
            raise ValueError("Categoría inválida")

        if not is_leaf_category(db, category.id):
            raise ValueError("La categoría seleccionada no es una categoría final")

    for field, value in data.items():
        setattr(db_product, field, value)

    db.commit()
    db.refresh(db_product)
    return db_product


def search_products(
    db: Session,
    q: str | None = None,
    category_id: int | None = None,
):
    query = (
        db.query(Product)
        .join(Category)
        .options(
            selectinload(Product.category)
        )
    )

    if q:
        q_like = f"%{q}%"
        query = query.filter(
            or_(
                Product.name.ilike(q_like),
                Product.description.ilike(q_like),
            )
        )

    if category_id:
        # Incluye productos de esa categoría hoja
        # o de cualquier hijo (si se pasa una categoría padre)
        child_ids = (
            db.query(Category.id)
            .filter(
                (Category.id == category_id)
                | (Category.parent_id == category_id)
            )
            .subquery()
        )

        query = query.filter(Product.category_id.in_(child_ids))

    return query.order_by(Product.id.desc()).all()



# =========================
# USERS / AUTH
# =========================

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def create_admin_if_not_exists(db: Session):
    admin_username = "admin"
    admin_password = "1234"

    user = get_user_by_username(db, admin_username)

    if not user:
        admin = User(
            username=admin_username,
            password=admin_password,
            is_admin=True
        )
        db.add(admin)
        db.commit()
        print("✅ Usuario admin creado")
    else:
        print("ℹ️ Usuario admin ya existe")


# =========================
# DOLAR USD
# =========================

def get_settings(db: Session):
    return db.query(Settings).first()


def init_settings(db: Session):
    settings = get_settings(db)
    if not settings:
        settings = Settings(usd_to_ars=1440)
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings


def update_usd_rate(db: Session, new_value: float):
    settings = get_settings(db)
    if not settings:
        settings = init_settings(db)

    settings.previous_usd_to_ars = settings.usd_to_ars
    settings.usd_to_ars = new_value
    settings.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(settings)
    return settings


# =========================
# CATEGORIES
# =========================

def list_categories(db: Session):
    return db.query(Category).order_by(Category.name).all()

def get_category_tree(db: Session):
    """
    Devuelve el árbol completo de categorías.
    Solo categorías raíz como punto de entrada.
    """
    roots = (
        db.query(Category)
        .options(selectinload(Category.children))
        .filter(Category.parent_id == None)
        .order_by(Category.name)
        .all()
    )
    return roots


def create_category(db: Session, category: schemas.CategoryCreate):
    name = category.name.strip().capitalize()

    exists = (
        db.query(Category)
        .filter(
            Category.name == name,
            Category.parent_id == category.parent_id,
        )
        .first()
    )
    if exists:
        raise ValueError("La categoría ya existe")

    # Validar parent si viene
    if category.parent_id is not None:
        parent = db.query(Category).filter(Category.id == category.parent_id).first()
        if not parent:
            raise ValueError("Categoría padre inválida")

    db_category = Category(
        name=name,
        parent_id=category.parent_id,
    )

    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


def update_category(db: Session, category_id: int, category: schemas.CategoryUpdate):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        return None

    data = category.dict(exclude_unset=True)

    if "name" in data:
        db_category.name = data["name"].strip().capitalize()

    if "parent_id" in data:
        if data["parent_id"] is not None:
            parent = db.query(Category).filter(Category.id == data["parent_id"]).first()
            if not parent:
                raise ValueError("Categoría padre inválida")

        db_category.parent_id = data["parent_id"]

    db.commit()
    db.refresh(db_category)
    return db_category


def delete_category(db: Session, category_id: int):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        return None

    try:
        db.delete(db_category)
        db.commit()
        return True
    except IntegrityError:
        db.rollback()
        raise

