from pydantic import BaseModel
import datetime

class ChatMessageBase(BaseModel):
    content: str

class ChatMessageCreate(ChatMessageBase):
    role: str

class ChatMessage(ChatMessageBase):
    id: int
    user_id: int
    role: str
    timestamp: datetime.datetime

    class Config:
        from_attributes = True
