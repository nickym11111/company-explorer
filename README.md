## Company Explorer

A full-stack web application for exploring detailed information about companies. Built using **Next.js + React** on the frontend, and **FastAPI + SQLite** on the backend. Styled with **Tailwind CSS**.

##  Tech Stack:

- **Frontend**: [React](https://reactjs.org/), [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/)
- **Database**: SQLite
- **Server**: Uvicorn (ASGI)


## Features:

- Responsive, clean UI with a modal view for detailed company data
- Company records fetched from a FastAPI backend
- SQLite database for easy local storage
- RESTful API for creating, retrieving, and deleting notes related to companies
- Tailwind CSS for fast and modern styling


## Frontend Setup:

cd app

npm install

npm run dev


## Backend Setup:

cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload

(You may need to create and initialize the db.sqlite file manually)

## DEMO:

https://drive.google.com/file/d/1N55tFYq0IUIaVU022P14Rhma-6-ebKpf/view?usp=sharing 