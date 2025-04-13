from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from app.data import get_db
from app.components.note import Note
from app.components.company import Company
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

# basic schemas
class NoteBase(BaseModel):
    content: str

class NoteCreate(NoteBase):
    company_id: int

class NoteResponse(NoteBase):
    id: int
    company_id: int
    created_at: datetime
    
    class Config:
        orm_mode = True

class NoteWithCompany(NoteResponse):
    company: Optional[dict] = None

@router.post("", response_model=NoteResponse)
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    """Create a note for a company"""
    # Verify company exists
    company = db.query(Company).filter(Company.id == note.company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    
    # Create new note
    db_note = Note(
        company_id=note.company_id,
        content=note.content
    )
    
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    
    return db_note

@router.get("", response_model=List[NoteWithCompany])
def get_notes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all notes with company information"""
    notes = db.query(Note).options(joinedload(Note.company)).order_by(Note.created_at.desc()).offset(skip).limit(limit).all()
    
    # Format the response to include company information
    result = []
    for note in notes:
        
        company_data = {
            "id": note.company.id,
            "name": note.company.name,
            "hq_location": note.company.hq_location,
            "description": note.company.description,
            "year_founded": note.company.year_founded,
            "headcount": note.company.headcount
        }

        
        note_data = {
            "id": note.id,
            "company_id": note.company_id,
            "content": note.content,
            "created_at": note.created_at,
            "company": company_data
        }
        
        result.append(note_data)
    
    return result

@router.get("/company/{company_id}", response_model=List[NoteResponse])
def get_notes_by_company(company_id: int, db: Session = Depends(get_db)):
    """Get all notes for a specific company"""
    return db.query(Note).filter(Note.company_id == company_id).order_by(Note.created_at.desc()).all()

@router.delete("/{note_id}", response_model=dict)
def delete_note(note_id: int, db: Session = Depends(get_db)):
    """Delete a note"""
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    db.delete(note)
    db.commit()
    
    return {"success": True, "message": "Note deleted successfully"}