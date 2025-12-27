from pydantic import BaseModel
from typing import Optional
from app.models import AdminRole

class AdminUserBase(BaseModel):
    username: str
    role: AdminRole

class AdminUserCreate(AdminUserBase):
    password: str

class AdminUserUpdate(BaseModel):
    username: Optional[str] = None
    role: Optional[AdminRole] = None
    is_active: Optional[bool] = None

class AdminUserOut(BaseModel):
    id: int
    username: str
    role: AdminRole
    is_active: bool

    class Config:
        from_attributes = True

class AdminPasswordChange(BaseModel):
    password: str
