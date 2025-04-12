from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.data import Base

class Note(Base):
    __tablename__ = "notes"
    
    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # company note is based off of
    company = relationship("Company", back_populates="notes")