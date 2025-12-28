from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import AdminUser, AdminRole
from app.schemas import UserOut
from app.deps.admin_auth import require_role

router = APIRouter(
    prefix="/admins",
    tags=["admins"],
)

# =========================
# LISTAR ADMINS (SUPER ADMIN)
# =========================

@router.get(
    "/",
    response_model=list[UserOut],
    dependencies=[Depends(require_role(AdminRole.SUPER_ADMIN))]
)
def list_admins(db: Session = Depends(get_db)):
    admins = db.query(AdminUser).order_by(AdminUser.id).all()
    return [
        UserOut(
            id=a.id,
            username=a.username,
            is_admin=True,
            role=a.role
        )
        for a in admins
    ]
