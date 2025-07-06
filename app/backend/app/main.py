from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models.config import settings
from .routes import health
from .database.database import create_tables

app = FastAPI(
    title=settings.APP_NAME,
    description="API for Project Odyssey",
    version="0.1.0",
    debug=settings.DEBUG
)

# Database initialization on startup
@app.on_event("startup")
async def startup_event():
    create_tables()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to Project Odyssey API",
        "docs": "/docs"
    }