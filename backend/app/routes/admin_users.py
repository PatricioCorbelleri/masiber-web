from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.deps.admin_auth import require_role, get_current_admin
from app.models import AdminRole
from app import schemas_admin, crud_admin

router = APIRouter(prefix="/admin/users", tags=["admin-users"])

@router.get(
    "/",
    response_model=list[schemas_admin.AdminUserOut],
    dependencies=[Depends(require_role(AdminRole.SUPER_ADMIN))]
)
def list_admins(db: Session = Depends(get_db)):
    return crud_admin.list_admins(db)


@router.post(
    "/",
    response_model=schemas_admin.AdminUserOut,
    dependencies=[Depends(require_role(AdminRole.SUPER_ADMIN))]
)
def create_admin(data: schemas_admin.AdminUserCreate, db: Session = Depends(get_db)):
    return crud_admin.create_admin(db, data)


@router.put(
    "/{admin_id}",
    response_model=schemas_admin.AdminUserOut,
    dependencies=[Depends(require_role(AdminRole.SUPER_ADMIN))]
)
def update_admin(admin_id: int, data: schemas_admin.AdminUserUpdate, db: Session = Depends(get_db)):
    admin = crud_admin.update_admin(db, admin_id, data)
    if not admin:
        raise HTTPException(404, "Admin no encontrado")
    return admin


@router.delete(
    "/{admin_id}",
    dependencies=[Depends(require_role(AdminRole.SUPER_ADMIN))]
)
def delete_admin(admin_id: int, db: Session = Depends(get_db)):
    if not crud_admin.delete_admin(db, admin_id):
        raise HTTPException(404, "Admin no encontrado")
    return {"message": "Admin eliminado"}


@router.put("/me/password")
def change_my_password(
    data: schemas_admin.AdminPasswordChange,
    admin = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    crud_admin.change_password(db, admin.id, data.password)
    return {"message": "Password actualizada"}
