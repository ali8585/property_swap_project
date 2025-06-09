# backend/app/crud.py
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas

def create_property(db: Session, property_in: schemas.PropertyCreate, user_id):
    db_property = models.Property(
        owner_id=user_id,
        type=property_in.type,
        latitude=property_in.latitude,
        longitude=property_in.longitude,
        area=property_in.area,
        document_type=property_in.document_type,
        approx_price=property_in.approx_price,
        amenities=property_in.amenities,
        interested_in_types=property_in.interested_in_types,
        rating=property_in.rating,
        priority=property_in.priority,
    )
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property

def get_properties(db: Session, skip: int = 0, limit: int = 100) -> List[models.Property]:
    return db.query(models.Property).offset(skip).limit(limit).all()

def get_properties_by_user(db: Session, user_id) -> List[models.Property]:
    return db.query(models.Property).filter(models.Property.owner_id == user_id).all()
