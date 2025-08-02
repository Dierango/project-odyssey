from fastapi import FastAPI
from app.routes import health, auth, chat
from app.database.database import engine, Base
from app.models import user, chat as chat_model
from dotenv import load_dotenv

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Athena API",
    description="A FastAPI backend application for Athena",
    version="1.0.0"
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Athena API", "docs": "/docs"}

app.include_router(health.router)
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(chat.router, prefix="/api/v1", tags=["chat"])