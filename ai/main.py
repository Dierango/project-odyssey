import google.generativeai as genai
import os
from dotenv import load_dotenv


load_dotenv(dotenv_path=".env")

# Paste your API key here
API_KEY = os.getenv("API_KEY")

if not API_KEY:
    raise ValueError("API_KEY is not set. Please set it in your .env file.")

# Configure API key
genai.configure(api_key=API_KEY)

# Initialise model
model = genai.GenerativeModel(model_name="models/gemini-2.5-flash")

# Get question from user
user_prompt = input("Write your cybersecurity question: ")

# Add the role and brevity instruction at the beginning of the prompt
full_prompt = (
    "You are a cybersecurity expert chatbot. "
    "Keep your answers short and concise. "
    "Provide only the most important information. "
    "Avoid unnecessary detail or lengthy explanations.\n\n"
    f"Question: {user_prompt}"
)

# Get an answer from the model
response = model.generate_content(full_prompt)

# Write the answer to the screen
print("\nAI Response:\n")
print(response.text)
