# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
import os 

# Initialize FastAPI app
app = FastAPI(title="BERT Sentiment Analysis API")

# Set up CORS to allow requests from your React app (usually at localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your fine-tuned model and tokenizer (make sure they are in the folder "bert-sentiment-model")
model_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'bert-base-sentiment-model'))

classifier = pipeline(
    "text-classification",
    model=model_dir,
    tokenizer=model_dir
)

# Define request data model
class TextData(BaseModel):
    text: str

# Create a POST endpoint for predictions
@app.post("/predict")
async def predict_sentiment(data: TextData):
    result = classifier(data.text)
    return result[0]  # returns a dict with 'label' and 'score'
