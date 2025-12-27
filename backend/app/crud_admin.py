from sqlalchemy.orm import Session
from app.models import AdminUser
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def list_admins(db: Session):
    return db.query(AdminUser).order_by(AdminUser.id).all()

def create_admin(db: Session, data):
    admin = AdminUser(
        username=data.username,
        password_hash=hash_password(data.password),
        role=data.role,
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin

def update_admin(db: Session, admin_id: int, data):
    admin = db.query(AdminUser).get(admin_id)
    if not admin:
        return None

    for field, value in data.dict(exclude_unset=True).items():
        setattr(admin, field, value)

    db.commit()
    db.refresh(admin)
    return admin

def delete_admin(db: Session, admin_id: int):
    admin = db.query(AdminUser).get(admin_id)
    if not admin:
        return None

    db.delete(admin)
    db.commit()
    return True

def change_password(db: Session, admin_id: int, password: str):
    admin = db.query(AdminUser).get(admin_id)
    if not admin:
        return None

    admin.password_hash = hash_password(password)
    db.commit()
    return True
