from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from ..database.database import get_db

router = APIRouter(
    prefix="/health",
    tags=["health"],
)

@router.get("/status")
def status():
    """
    Returns the status of the API.
    """
    return {
        "status": "OK",
        "timestamp": datetime.now().isoformat()
    }

@router.get("/database")
def database_health(db: Session = Depends(get_db)):
    """
    Checks if the database connection is working.
    """
    try:
        # Execute a simple query to check if the database is responding
        db.execute("SELECT 1")
        return {
            "database": "connected",
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection error: {str(e)}")