# Timesheet App

A simple, customizable timesheet generator with auto-fill scheduling, ad hoc edits, and PDF export. Built with FastAPI (backend) and React (frontend).

**Link to project:** [https://cerulean-begonia-929d38.netlify.app/](https://cerulean-begonia-929d38.netlify.app/)

**Built with:** Python, Javascript, JSX, FastAPI, React

## About this project

### Purpose

This project was created to streamline the process of filling out and submitting staff timesheets. By allowing users to set standard workdays and hours, the app automatically generates a two-week timesheet that can be customized for exceptions and exported as a PDF. It aims to reduce manual entry errors, save time, and improve the accuracy and consistency of timesheet submissions

### Features

- Select workdays and standard hours
- Auto-fill your timesheet with standard schedule
- Make custom adjustments to individual days
- Export timesheet to PDF
- Clean, modern UI with responsive layout
- REST API powered by FastAPI

### Lessons learnt

This project served as a hands-on introduction to building full-stack applications using a REST API architecture. It was my first self-taught experience using modern web frameworks — FastAPI for the backend and React for the frontend. Through this process, I gained practical experience in:

- Designing and consuming RESTful APIs
- Connecting frontend and backend components to create a functional app
- Writing clean and modular code in both Python and JavaScript
- Deploying a live frontend for the first time using Netlify

**Resources**
- [FastAPI Full Crash Course - Python’s Fastest Web Framework](https://www.youtube.com/watch?v=rvFsGRvj9jo)
- [Building A Simple REST API with FastAPI in Python](https://www.youtube.com/watch?v=VSQZl43jFzk)
- [React Tutorial](https://www.w3schools.com/react/default.asp)
- [jsPDF Documentation](https://www.npmjs.com/package/jspdf)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Python 3.10+](https://www.python.org/)
- `pip` and `venv` or another Python environment manager

### Installation

**1. Clone the repository to your device**

HTTPS
```
git clone https://github.com/ajjena/timesheet-app.git
```
SSH
```
git clone git@github.com:ajjena/timesheet-app.git
```

**2. Backend – FastAPI**

```
cd timesheet_backend
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The backend will run at: http://localhost:8000

**3. Frontend - React**

```
cd timesheet_frontend
npm install
npm start
```
The frontend will run at: http://localhost:3000