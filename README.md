# Timesheet App

A simple, customizable timesheet generator with auto-fill scheduling, ad hoc edits, and PDF export. Built with FastAPI (backend) and React (frontend).

**Link to project:** 

**Built with:** Python, Javascript, JSX, FastAPI, React

---

## About this project

**Purpose:**

This project was created to streamline the process of filling out and submitting staff timesheets. By allowing users to set standard workdays and hours, the app automatically generates a two-week timesheet that can be customized for exceptions and exported as a PDF. It aims to reduce manual entry errors, save time, and improve the accuracy and consistency of timesheet submissions

**Features**

- Select workdays and standard hours
- Auto-fill your timesheet with standard schedule
- Make custom adjustments to individual days
- Export timesheet to PDF
- Clean, modern UI with responsive layout
- REST API powered by FastAPI

**Lessons learnt**



---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Python 3.10+](https://www.python.org/)
- `pip` and `venv` or another Python environment manager

### Installation

**Backend – FastAPI**

```
cd timesheet_backend
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend - React**

```
cd timesheet_frontend
npm install
npm start
```