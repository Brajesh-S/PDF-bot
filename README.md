#Project Title
   PDF-bot

#Description
   PDF-Bot is a FastAPI-based tool that lets users upload PDFs, indexes their content using LlamaIndex's VectorStoreIndex  and provides a chat interface powered by LlamaIndex's ChatEngine. Users can ask questions about the uploaded PDFs or any general queries The tool has a React frontend and supports cross-origin requests, making it a flexible solution for document-related Q&A and general info retrieval.

#Tech-Stack:
   Backend: FastAPI
   Frontend: React.js
   File Storage: Local filesystem 

#Backend Specifications:
   I used methods from llama_index.core:
   load_documents: This loads documents (likely PDFs) from a directory path using SimpleDirectoryReader.
   create_index: It creates a vector store index from a list of documents using VectorStoreIndex.from_documents.
   chat engine: Integrated from llama_index, it searches the document index to generate responses to user queries based on uploaded documents.

#Setup Instructions
   Back-end
   Python 3.10.7
   Install requirements.txt

   Front-end
   React
   Install dependencies from package.json


