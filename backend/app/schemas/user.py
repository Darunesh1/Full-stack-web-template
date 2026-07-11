from datetime import datetime
from typing import Optional
import uuid
from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    """Base fields shared across User schemas."""

    email: EmailStr
    full_name: Optional[str] = Field(default=None, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False


class UserCreate(BaseModel):
    """Schema for user registration / signup."""

    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    full_name: Optional[str] = Field(default=None, max_length=255)


class UserUpdate(BaseModel):
    """Schema for updating user details. All fields are optional."""

    email: Optional[EmailStr] = None
    password: Optional[str] = Field(default=None, min_length=8, max_length=128)
    full_name: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    is_verified: Optional[bool] = None


class UserRead(UserBase):
    """Schema returned when reading user details from the database."""

    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        # from_attributes is Pydantic v2's replacement for standard orm_mode=True
