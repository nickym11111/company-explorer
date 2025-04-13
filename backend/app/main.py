from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import companies, notes
from app.data import init_db

app = FastAPI(title="Company Explorer API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# add routers
app.include_router(companies.router,prefix="/companies", tags=["companies"])
app.include_router(notes.router,prefix="/notes", tags=["notes"])

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/")
def read_root():
    return {"message": "Welcome to Company Explorer API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)