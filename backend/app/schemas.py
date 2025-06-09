# backend/app/schemas.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from enum import Enum
from uuid import UUID

class PropertyType(str, Enum):
    agricultural = "agricultural"
    commercial = "commercial"
    residential = "residential"

class UserBase(BaseModel):
    username: str = Field(..., max_length=50)
    email: EmailStr

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserOut(UserBase):
    id: UUID

    class Config:
        orm_mode = True

class PropertyBase(BaseModel):
    type: PropertyType
    latitude: float
    longitude: float
    area: float
    document_type: Optional[str] = None
    approx_price: Optional[float] = None
    amenities: Optional[str] = None
    interested_in_types: Optional[str] = None
    rating: Optional[float] = 0.0
    priority: Optional[int] = 0

class PropertyCreate(PropertyBase):
    pass

class PropertyOut(PropertyBase):
    id: UUID
    owner_id: UUID

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
