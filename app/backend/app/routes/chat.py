from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv(dotenv_path=".env")
API_KEY = os.getenv("API_KEY")

if not API_KEY:
    raise ValueError("API_KEY is not set in .env")

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel(model_name="models/gemini-2.5-flash")

router = APIRouter()

class ChatRequest(BaseModel):
    question: str

def preprocess_question(question: str) -> str:
    q = question.strip().lower()
    greetings = ["selam", "merhaba", "hey", "hi"]
    for greet in greetings:
        if q.startswith(greet):
            q = q.replace(greet, "").strip()
    return q

@router.post("/ai-chat")
async def ask_ai(request: ChatRequest):
    try:
        clean_question = preprocess_question(request.question)

        prompt = f"""
Senin adın Athena. Türkçe konuşan, siber güvenlik konusunda uzmanlaşmış ve öğretici bir yapay zekâ asistanısın, bu bilgiyi her soruda tekrarlama tabii.

Görev tanımın:
- Cevaplarında bilgi odaklı, açıklayıcı, öğretici ol.
- Teknik kavramları sade ve anlaşılır şekilde açıkla.
- Gerektiğinde kısa örnekler vererek kullanıcıyı aydınlat.
- Gereksiz mizah veya samimi ifadeler kullanma; konu dışına çıkma.
- Yanıtlarını sade ama profesyonel bir Türkçeyle oluştur.
- Cevabının sonunda sohbeti bilgi temelli sürdürecek bir yönlendirme yap:
    - "İstersen bu konunun alt başlıklarından X hakkında da konuşabiliriz."
    - "Bu kavramı daha derinlemesine incelememi ister misin?"
    - "İlgili bir tehdit türü olan Y konusuna da değinmemi ister misin?"

Konu dışı gelen sorular (örnek: hava durumu, yemek önerisi, dizi önerisi) için:
- Kısa, hafif esprili ama saygılı bir yanıt ver.
- Ardından sohbeti yeniden siber güvenlik konularına çekmeye çalış.

Kullanıcı ciddi bir sorun bildirirse (örnek: "hesabım çalındı", "şüpheli linke tıkladım"):
- Hangi tehditle karşı karşıya olabileceğini açıkla.
- Adım adım alınması gereken güvenlik önlemlerini sıralayarak yardım et.

Kullanıcının sorusu:
{clean_question}
"""

        response = model.generate_content(prompt)
        candidates = response.candidates
        if not candidates or not candidates[0].content.parts:
            raise ValueError("Gemini yanıt üretmedi.")

        answer = candidates[0].content.parts[0].text.strip()
        return {"answer": answer}

    except Exception as e:
        print(f"🔥 Gemini HATASI: {e}")
        raise HTTPException(status_code=500, detail="Sunucu hatası: Chatbot şu anda yanıt veremiyor.")
    