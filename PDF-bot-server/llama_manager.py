import os, shutil
from dotenv import load_dotenv
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex

DOCS_PATH = os.getenv('DOCS_PATH', 'docs')

class LlamaManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(LlamaManager, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance

    def _initialize(self):
        # Load environment variables
        load_dotenv()
        self.key = os.getenv('OPENAI_API_KEY')
        
        # Check if the directory contains documents
        if os.path.exists(DOCS_PATH) and os.listdir(DOCS_PATH):
            # Load documents
            self.documents = self.load_documents(DOCS_PATH)
            
            # Create index
            self.index = self.create_index(self.documents)
            
            # Create chat engine
            self.chat_engine = self.create_chat_engine(self.index)
        else:
            # If the directory is empty, initialize with empty data
            self.documents = []
            self.index = None
            self.chat_engine = None

    def load_documents(self, input_dir: str):
        reader = SimpleDirectoryReader(input_dir=input_dir)
        documents = reader.load_data()
        return documents

    def create_index(self, documents):
        index = VectorStoreIndex.from_documents(documents)
        return index

    def create_chat_engine(self, index):
        chat_engine = index.as_chat_engine()
        return chat_engine

    def update_index(self):
        # Reload documents
        self.documents = self.load_documents(DOCS_PATH)
        
        # Create a new index
        self.index = self.create_index(self.documents)
        
        # Create a new chat engine
        self.chat_engine = self.create_chat_engine(self.index)

    def clear_files(self):
        shutil.rmtree(DOCS_PATH)

llama_manager = LlamaManager()
