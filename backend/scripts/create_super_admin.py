from app.database import SessionLocal
from app.models import AdminUser, AdminRole
from app.security import hash_password  # o donde tengas bcrypt

db = SessionLocal()

username = "admin"
password = "1234"  # después lo cambiás

exists = db.query(AdminUser).filter(
    AdminUser.username == username
).first()

if exists:
    print("⚠️ Admin ya existe")
else:
    admin = AdminUser(
        username=username,
        password_hash=hash_password(password),
        role=AdminRole.SUPER_ADMIN,
        is_active=True
    )
    db.add(admin)
    db.commit()
    print("✅ SUPER_ADMIN creado")

db.close()
