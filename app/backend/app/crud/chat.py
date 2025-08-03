from sqlalchemy.orm import Session
from app.models.chat import ChatMessage
from app.schemas.chat import ChatMessageCreate

def create_chat_message(db: Session, user_id: int, message: ChatMessageCreate):
    db_message = ChatMessage(user_id=user_id, role=message.role, content=message.content)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_chat_history(db: Session, user_id: int):
    return db.query(ChatMessage).filter(ChatMessage.user_id == user_id).all()
