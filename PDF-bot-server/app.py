import os, shutil
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from llama_manager import llama_manager

# Load environment variables
DOCS_PATH = os.getenv('DOCS_PATH', 'docs')

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://pdf-bot-qycp.onrender.com"],  # React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Function to handle PDF upload
@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # Ensure the directory exists
        if not os.path.exists(DOCS_PATH):
            os.makedirs(DOCS_PATH)

        # Save the file
        file_location = os.path.join(DOCS_PATH, file.filename)
        with open(file_location, "wb") as f:
            f.write(file.file.read())

        # Update LlamaManager with the new documents
        llama_manager.update_index()
        llama_manager.clear_files()

        return {"info": f"file '{file.filename}' saved at '{file_location}'"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Function to handle chat queries
class QueryModel(BaseModel):
    question: str

@app.post("/chat/")
async def chat(query: QueryModel):
    print("chat engine", llama_manager.chat_engine)
    try:
        if llama_manager.chat_engine is not None:
            response = llama_manager.chat_engine.chat(query.question)
            response_dict = jsonable_encoder(response)
            return JSONResponse(content={"response": response_dict})
        else:
            return JSONResponse(content={"message": "Please upload the PDF to continue."}, status_code=202)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Root endpoint
@app.get("/")
async def read_root():
    return {"Hello": "World"}

if __name__ == "__main__":
    # Run the FastAPI app
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
