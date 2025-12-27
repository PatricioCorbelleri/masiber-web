from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
from app.models import AdminUser, AdminRole, AdminSession

security = HTTPBearer(auto_error=False)

def get_current_admin(
    creds: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    if not creds:
        raise HTTPException(401, "Not authenticated")

    session = db.query(AdminSession).filter(
        AdminSession.token == creds.credentials,
        AdminSession.revoked == False
    ).first()

    if not session or (session.expires_at and session.expires_at < datetime.utcnow()):
        raise HTTPException(401, "Invalid or expired token")

    admin = db.query(AdminUser).filter(
        AdminUser.id == session.admin_id,
        AdminUser.is_active == True
    ).first()

    if not admin:
        raise HTTPException(401, "Inactive admin")

    return admin


def require_role(*roles: AdminRole):
    def checker(admin: AdminUser = Depends(get_current_admin)):
        if admin.role not in roles:
            raise HTTPException(403, "Not enough permissions")
        return admin
    return checker
