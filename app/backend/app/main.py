from fastapi import FastAPI
from app.routes import health, auth
from app.database.database import engine, Base
from dotenv import load_dotenv

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Project Odyssey API",
    description="A FastAPI backend application",
    version="1.0.0"
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Project Odyssey API", "docs": "/docs"}

app.include_router(health.router)
app.include_router(auth.router, prefix="/auth", tags=["auth"])