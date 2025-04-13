from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.data import get_db
from app.components.company import Company
from pydantic import BaseModel
from sqlalchemy import or_
from rapidfuzz import fuzz


router = APIRouter()

# need to know info about a company as a model
class CompanyBase(BaseModel):
    name: str
    domain: Optional[str] = None
    headcount: Optional[int] = None
    year_founded: Optional[int] = None
    hq_location: Optional[str] = None
    description: Optional[str] = None
    linkedin_url: Optional[str] = None
    keywords: Optional[str] = None

# not shown info about a company as a model
class CompanyResponse(CompanyBase):
    id: int
    entity_id: Optional[int] = None
    headcount_change_3m: Optional[float] = None
    headcount_change_6m: Optional[float] = None
    headcount_change_1y: Optional[float] = None
    
    class Config:
        orm_mode = True

@router.get("/test")
def test_companies_route():
    return {"message": "Companies route works"}

@router.get("", response_model=List[CompanyResponse])
def get_companies(
    search: Optional[str] = None,
    hq_location: Optional[str] = None,
    min_year: Optional[int] = None,
    max_year: Optional[int] = None,
    min_headcount: Optional[int] = None,
    max_headcount: Optional[int] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    #Get a list of companies with optional filters
    query = db.query(Company)
    
    # Applies filters
    """
        if search:
        query = query.filter(
            or_(
                Company.name.ilike(f"%{search}%"),
                Company.description.ilike(f"%{search}%"),
                Company.keywords.ilike(f"%{search}%")
            )
        )
    """

    
    if hq_location:
        query = query.filter(Company.hq_location.ilike(f"%{hq_location}%"))
    
    if min_year:
        query = query.filter(Company.year_founded >= min_year)
    
    if max_year:
        query = query.filter(Company.year_founded <= max_year)
    
    if min_headcount:
        query = query.filter(Company.headcount >= min_headcount)
    
    if max_headcount:
        query = query.filter(Company.headcount <= max_headcount)
    
    results = query.all()

    if search:
        # Apply fuzzy filtering 
        search_lower = search.lower()
        filtered = []
        for company in results:
            fields = [company.name, company.description, company.keywords]
            max_score = max(
                fuzz.partial_ratio(search_lower, str(field).lower()) 
                for field in fields if field
            )
            if max_score >= 70:  # threshold can be adjusted
                filtered.append(company)
        return filtered[skip: skip + limit]

    return results[skip: skip + limit]




@router.get("/locations", response_model=List[str])
def get_unique_locations(db: Session = Depends(get_db)):
    # Get all unique non-null locations
    locations = db.query(Company.hq_location).filter(Company.hq_location.isnot(None)).distinct().all()
    return [loc[0] for loc in locations if loc[0]]

@router.get("/founded-years", response_model=List[int])
def get_founded_years(db: Session = Depends(get_db)):
    years = db.query(Company.year_founded).filter(Company.year_founded.isnot(None)).distinct().order_by(Company.year_founded).all()
    return [year[0] for year in years if year[0]]

@router.get("/{company_id}", response_model=CompanyResponse)
def get_company(company_id: int, db: Session = Depends(get_db)):
    #Get a specific company by ID
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company