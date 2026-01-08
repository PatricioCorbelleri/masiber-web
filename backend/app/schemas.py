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
# TIPO DE MARGEN
# =========================

class MarginType(str, Enum):
    PERCENT = "PERCENT"
    FIXED = "FIXED"


# =========================
# PRECIOS 
# =========================

class BulkUpdateRequest(BaseModel):
    field: str              # cost_usd | margin_value
    action: str             # INCREASE | DECREASE
    type: str               # PERCENT | FIXED
    value: float
    brand_id: Optional[int] = None
    category_id: Optional[int] = None


class BulkPreviewItem(BaseModel):
    id: int
    name: str
    old_value: Optional[float]
    new_value: Optional[float]
    diff: Optional[float]


class BulkPreviewResponse(BaseModel):
    total: int
    items: List[BulkPreviewItem]

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
# MARCAS
# =========================

class BrandBase(BaseModel):
    name: str


class BrandCreate(BrandBase):
    pass


class BrandOut(BrandBase):
    id: int

    class Config:
        from_attributes = True


# =========================
# PRODUCTOS
# =========================

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None

    # 👉 relaciones
    category_id: int
    brand_id: int

    condition: ProductCondition = ProductCondition.USADO
    stock: int = 0

    images: List[str] = Field(default_factory=list)
    video: Optional[str] = None


class ProductCreate(ProductBase):
    # 🔒 datos internos de negocio (solo admin)
    cost_usd: float
    margin_type: MarginType
    margin_value: float


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

    category_id: Optional[int] = None
    brand_id: Optional[int] = None

    condition: Optional[ProductCondition] = None
    stock: Optional[int] = None

    # 🔒 negocio
    cost_usd: Optional[float] = None
    margin_type: Optional[MarginType] = None
    margin_value: Optional[float] = None

    images: Optional[List[str]] = None
    video: Optional[str] = None

    class Config:
        from_attributes = True


class ProductOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

    stock: int
    condition: ProductCondition

    # 💰 precios
    cost_usd: Optional[float] = None
    margin_value: Optional[float] = None
    margin_type: Optional[str] = None
    price_usd: Optional[float] = None

    # relaciones
    category: CategoryOut
    brand: Optional[BrandOut] = None

    images: List[str] = Field(default_factory=list)
    video: Optional[str] = None

    class Config:
        from_attributes = True


class ProductAdminOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

    cost_usd: Optional[float]
    margin_type: Optional[MarginType]
    margin_value: Optional[float]

    price_usd: Optional[float]

    stock: int
    condition: ProductCondition

    brand: BrandOut
    category: CategoryOut

    images: List[str] = Field(default_factory=list)
    video: Optional[str] = None

    class Config:
        from_attributes = True

class ProductPublicOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

    price_usd: Optional[float]

    condition: ProductCondition

    brand: BrandOut
    category: CategoryOut

    images: List[str] = Field(default_factory=list)
    video: Optional[str] = None

    class Config:
        from_attributes = True

class BulkPriceUpdate(BaseModel):
    brand_id: Optional[int] = None
    category_id: Optional[int] = None

    margin_type: MarginType
    margin_value: float


# =========================
# AUTH (NO TOCAR)
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
