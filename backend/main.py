from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from pydantic import BaseModel

app = FastAPI()

# Pydantic model for the comment
class Comment(BaseModel):
    text: str

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/api/hello")
def read_root():
    return {"message": "Hello from backend!"}

@app.post("/api/submit-comment")
def submit_comment(comment: Comment):
    # In a real app, you'd save the comment to a database
    print(f"Received comment: {comment.text}")
    return {"message": "Comment sent"}

@app.get("/api/canned-response")
def get_canned_response():
    return {"message": "This is a canned response. Thanks for your input!"}

handler = Mangum(app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


