from app.database import SessionLocal
from app.models import AdminUser, AdminRole
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

db = SessionLocal()

username = "pato"
password = "admin123"

exists = db.query(AdminUser).filter(AdminUser.username == username).first()

if exists:
    print("❌ El admin ya existe")
else:
    admin = AdminUser(
        username=username,
        password_hash=hash_password(password),
        role=AdminRole.SUPER_ADMIN,
        is_active=True
    )
    db.add(admin)
    db.commit()
    print("✅ Super admin creado correctamente")

db.close()
