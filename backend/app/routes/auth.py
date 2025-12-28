from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.database import get_db
from app.models import AdminUser
from app.schemas import UserLogin, UserOut

router = APIRouter(prefix="/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


@router.post("/login", response_model=UserOut)
def login(data: UserLogin, db: Session = Depends(get_db)):
    admin = (
        db.query(AdminUser)
        .filter(
            AdminUser.username == data.username,
            AdminUser.is_active == True
        )
        .first()
    )

    if not admin:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    if not verify_password(data.password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    return UserOut(
        id=admin.id,
        username=admin.username,
        is_admin=True,
        role=admin.role  # 🔥 CLAVE PARA EL FRONT
    )
