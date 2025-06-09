# backend/app/models.py
from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import enum
import uuid

from app.database import Base

class PropertyType(enum.Enum):
    agricultural = "agricultural"
    commercial = "commercial"
    residential = "residential"

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    properties = relationship("Property", back_populates="owner")

class Property(Base):
    __tablename__ = "properties"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    type = Column(Enum(PropertyType), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    area = Column(Float, nullable=False)  # متر مربع
    document_type = Column(String, nullable=True)  # نوع سند
    approx_price = Column(Float, nullable=True)   # قیمت تقریبی
    amenities = Column(String, nullable=True)     # امکانات به صورت متن
    interested_in_types = Column(String, nullable=True)  # نوع ملکی که کاربر می‌خواهد تهاطر شود (مثلاً agricultural, residential)

    rating = Column(Float, default=0.0)       # امتیاز کلی ملک
    priority = Column(Integer, default=0)     # اولویت برای پیشنهاد

    owner = relationship("User", back_populates="properties")
