from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.database import get_db
from app.models import AdminUser, AdminSession
from app.core.security import verify_password, create_token

router = APIRouter(prefix="/admin/auth", tags=["Admin Auth"])

@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.username == data["username"]).first()

    if not admin or not verify_password(data["password"], admin.password_hash):
        raise HTTPException(401, "Invalid credentials")

    token = create_token()

    session = AdminSession(
        admin_id=admin.id,
        token=token,
        expires_at=datetime.utcnow() + timedelta(days=7)
    )

    db.add(session)
    db.commit()

    return {
        "token": token,
        "role": admin.role,
        "username": admin.username
    }
