from sqlalchemy import Column, Integer, String, Float, Text
from sqlalchemy.orm import relationship
from app.data import Base

class Company(Base):
    __tablename__ = "companies"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    entity_id = Column(Integer, unique=True, index=True)
    name = Column(String, index=True)
    domain = Column(String)
    headcount = Column(Integer)
    year_founded = Column(Integer)
    hq_location = Column(String)
    description = Column(Text)
    linkedin_url = Column(String)
    headcount_change_3m = Column(Float)
    headcount_change_6m = Column(Float)
    headcount_change_1y = Column(Float)
    keywords = Column(String)
    # added notes
    notes = relationship("Note", back_populates="company", cascade="all, delete-orphan")