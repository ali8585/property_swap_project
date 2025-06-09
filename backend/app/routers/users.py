# backend/app/routers/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app import models, schemas, auth
from app.database import get_db

router = APIRouter()

@router.post("/register", response_model=schemas.UserOut)
def register(user_create: schemas.UserCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        (models.User.username == user_create.username) | (models.User.email == user_create.email)
    ).first()
    if user:
        raise HTTPException(status_code=400, detail="Username or email already registered")
    hashed_password = auth.get_password_hash(user_create.password)
    new_user = models.User(
        username=user_create.username,
        email=user_create.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.UserOut)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user
