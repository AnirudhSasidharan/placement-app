from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
model = genai.GenerativeModel("gemini-pro")
GOOGLE_API_KEY = "AIzaSyDiO_vEaq0phLR_NeqFJkMZYyLtJnFt4us"
genai.configure(api_key=GOOGLE_API_KEY)
chat = model.start_chat(history=[])

origins = [
    "http://localhost:3000",  # React dev server
    "http://localhost:5173",  # Vite dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestModel(BaseModel):
    data: str

class ResponseModel(BaseModel):
    result: str

def get_gemini_response(question: str) -> str:
    try:
        question = str(question)
        response = chat.send_message(
            "Provide a YouTube link for developing English grammar. Just return the YouTube link."
        )
        # Ensure that the response contains a valid YouTube link
        link = response.text.strip()
        print(link)
        if "youtube.com" not in link:
            raise ValueError("Invalid YouTube link generated")
        return link
    except Exception as e:
        print(f"Error getting Gemini response: {e}")
        raise HTTPException(status_code=500, detail="Error getting Gemini response")
    
get_gemini_response('5')

@app.post("/api/getGeminiResponse", response_model=ResponseModel)
async def api_get_gemini_response(request: RequestModel):
    try:
        result = get_gemini_response(request.data)
        return ResponseModel(result=result)
    except Exception as e:
        print(f"Error in /api/getGeminiResponse: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
