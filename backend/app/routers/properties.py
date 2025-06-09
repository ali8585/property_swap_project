# backend/app/routers/properties.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import io
import csv

from app import schemas, models, auth, crud, csv_import, recommender
from app.database import get_db

router = APIRouter()

@router.post("/properties/", response_model=schemas.PropertyOut)
def create_property(
    property_in: schemas.PropertyCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
):
    return crud.create_property(db=db, property_in=property_in, user_id=current_user.id)

@router.get("/properties/", response_model=List[schemas.PropertyOut])
def read_properties(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_properties(db, skip=skip, limit=limit)

@router.post("/properties/upload-csv/")
async def upload_properties_csv(
    file: UploadFile = File(...),
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
):
    content = await file.read()
    csvfile = io.StringIO(content.decode("utf-8"))
    reader = csv.DictReader(csvfile)
    properties = csv_import.import_properties_from_csv(reader, current_user.id, db)
    return {"imported": len(properties)}

@router.get("/properties/recommendations/", response_model=List[schemas.PropertyOut])
def get_recommendations(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
):
    user_properties = crud.get_properties_by_user(db, current_user.id)
    all_properties = crud.get_properties(db)
    recommended = recommender.recommend_properties(user_properties, all_properties)
    return recommended
