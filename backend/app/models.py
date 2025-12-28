import enum
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    JSON,
    Boolean,
    DateTime,
    ForeignKey,
    Enum,
)
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class ProductCondition(str, enum.Enum):
    NUEVO = "NUEVO"
    CASI_NUEVO = "CASI_NUEVO"
    USADO = "USADO"


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)

    brand = Column(String, nullable=True)

    condition = Column(
        Enum(ProductCondition, name="product_condition"),
        nullable=False,
        default=ProductCondition.NUEVO
    )

    price_usd = Column(Float, nullable=True)
    stock = Column(Integer, default=0)

    category_id = Column(
        Integer,
        ForeignKey("categories.id", ondelete="RESTRICT"),
        nullable=False
    )

    category = relationship("Category", back_populates="products")

    images = Column(JSON, default=list)
    video = Column(String, nullable=True)



class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    parent_id = Column(
        Integer,
        ForeignKey("categories.id", ondelete="RESTRICT"),
        nullable=True,
    )

    # Relación jerárquica
    parent = relationship(
        "Category",
        remote_side=[id],
        back_populates="children",
    )

    children = relationship(
        "Category",
        back_populates="parent",
        passive_deletes=True,
    )

    products = relationship(
        "Product",
        back_populates="category",
        passive_deletes=True,
    )


#-------------------------------------
# VALOR DEL DOLAR
#-------------------------------------

class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    usd_to_ars = Column(Float, nullable=False)
    previous_usd_to_ars = Column(Float)
    updated_at = Column(DateTime, default=datetime.utcnow)

#-------------------------------------
# ADMINISTRADOR
#-------------------------------------

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)


class AdminRole(str, enum.Enum):
    SUPER_ADMIN = "SUPER_ADMIN"
    ADMIN = "ADMIN"


class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String(80), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)

    role = Column(
        Enum(AdminRole, name="admin_role"),
        nullable=False,
        default=AdminRole.ADMIN
    )

    is_active = Column(Boolean, default=True, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)


class AdminSession(Base):
    __tablename__ = "admin_sessions"

    id = Column(Integer, primary_key=True)
    admin_id = Column(Integer, ForeignKey("admin_users.id", ondelete="CASCADE"))
    token = Column(String(255), unique=True, index=True, nullable=False)

    revoked = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=True)