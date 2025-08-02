from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud.chat import create_chat_message, get_chat_history
from app.schemas.chat import ChatMessageCreate, ChatMessage
from app.database.database import get_db
from app.utils.security import get_current_user
from app.models.user import User
import google.generativeai as genai
import os

router = APIRouter()

# Configure the Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash')

@router.post("/chat", response_model=ChatMessage)
def chat(message: ChatMessageCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Check if API key is configured
    if not os.getenv("GEMINI_API_KEY"):
        raise HTTPException(status_code=500, detail="Gemini API key not configured")
    
    # Save the user's message
    user_message = create_chat_message(db=db, user_id=current_user.id, message=message)

    # Send the message to the Gemini API
    try:
        # Create a cybersecurity-focused prompt
        system_prompt = """You are 'Athena,' a world-class cybersecurity expert and AI assistant. Your purpose is to:
        1. Provide clear, accurate, and helpful information on cybersecurity topics
        2. Help users understand digital security, privacy, and online safety
        3. Offer practical advice for protecting digital identities
        4. Explain complex cybersecurity concepts in an accessible way
        5. Stay up-to-date with the latest threats and protection methods
        
        Always be helpful, professional, and educational in your responses."""
        
        full_prompt = f"{system_prompt}\n\nUser's message: {message.content}"
        response = model.generate_content(full_prompt)
        ai_response_content = response.text
        
    except Exception as e:
        print(f"Gemini API Error: {str(e)}")  # Log the actual error
        raise HTTPException(status_code=500, detail=f"Failed to get response from AI: {str(e)}")

    # Save the AI's response
    ai_message = ChatMessageCreate(role="assistant", content=ai_response_content)
    db_ai_message = create_chat_message(db=db, user_id=current_user.id, message=ai_message)

    return db_ai_message

@router.get("/chat/history", response_model=list[ChatMessage])
def chat_history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_chat_history(db=db, user_id=current_user.id)
