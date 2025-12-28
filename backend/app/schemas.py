from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

# =========================
# CONDICION DEL PRODUCTO
# =========================

class ProductCondition(str, Enum):
    NUEVO = "NUEVO"
    CASI_NUEVO = "CASI_NUEVO"
    USADO = "USADO"

# =========================
# CATEGORIAS
# =========================

class CategoryBase(BaseModel):
    name: str

    class Config:
        from_attributes = True


class CategoryCreate(CategoryBase):
    parent_id: Optional[int] = None


class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    parent_id: Optional[int] = None

    class Config:
        from_attributes = True


class CategoryOut(CategoryBase):
    id: int

    class Config:
        from_attributes = True

class CategoryTree(BaseModel):
    id: int
    name: str
    children: List["CategoryTree"] = []

    class Config:
        from_attributes = True


# =========================
# PRODUCTOS
# =========================

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price_usd: Optional[float] = None
    stock: int = 0

    brand: Optional[str] = None
    condition: ProductCondition = ProductCondition.USADO

    # 👉 categoría hoja
    category_id: int

    images: List[str] = Field(default_factory=list)
    video: Optional[str] = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price_usd: Optional[float] = None
    stock: Optional[int] = None

    brand: Optional[str] = None
    condition: Optional[ProductCondition] = None
    category_id: Optional[int] = None

    images: Optional[List[str]] = None
    video: Optional[str] = None

    class Config:
        from_attributes = True


class ProductOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price_usd: Optional[float] = None
    stock: int

    brand: Optional[str]
    condition: ProductCondition

    category: CategoryOut

    images: List[str] = Field(default_factory=list)
    video: Optional[str] = None

    class Config:
        from_attributes = True


# =========================
# AUTH
# =========================

class UserLogin(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    is_admin: bool
    role: str

    class Config:
        from_attributes = True


CategoryTree.model_rebuild()

