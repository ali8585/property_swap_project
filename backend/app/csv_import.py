# backend/app/csv_import.py
from sqlalchemy.orm import Session
from app import models, schemas

def import_properties_from_csv(reader, user_id, db: Session):
    imported = []
    for row in reader:
        prop_data = schemas.PropertyCreate(
            type=row.get("type"),
            latitude=float(row.get("latitude", 0)),
            longitude=float(row.get("longitude", 0)),
            area=float(row.get("area", 0)),
            document_type=row.get("document_type"),
            approx_price=float(row.get("approx_price", 0)),
            amenities=row.get("amenities"),
            interested_in_types=row.get("interested_in_types"),
            rating=float(row.get("rating", 0)) if row.get("rating") else 0.0,
            priority=int(row.get("priority", 0)) if row.get("priority") else 0,
        )
        property_obj = models.Property(
            owner_id=user_id,
            type=prop_data.type,
            latitude=prop_data.latitude,
            longitude=prop_data.longitude,
            area=prop_data.area,
            document_type=prop_data.document_type,
            approx_price=prop_data.approx_price,
            amenities=prop_data.amenities,
            interested_in_types=prop_data.interested_in_types,
            rating=prop_data.rating,
            priority=prop_data.priority,
        )
        db.add(property_obj)
        imported.append(property_obj)
    db.commit()
    return imported
