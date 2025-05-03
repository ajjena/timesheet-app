from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import date

# uvicorn main:app --reload
app = FastAPI()

# Allow React frontend (localhost:3000) to talk to FastAPI backend (localhost:8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
timesheets = []

# Pydantic model for a timesheet
class TimesheetRow(BaseModel):
    dayIndex: int
    week: int
    startTime: str
    endTime: str
    break_time: float  # or breakTime
    hoursWorked: float
    active: bool

class TimesheetPayload(BaseModel):
    employee_name: str
    start_date: str
    timesheet: List[TimesheetRow]
    week1_total: float
    week2_total: float

# GET endpoint to retrieve all timesheets
@app.get("/timesheets/", response_model=List[TimesheetPayload])
def get_timesheets():
    return timesheets

# POST endpoint to add a timesheet
@app.post("/timesheets/", response_model=dict)
def add_timesheet(timesheet: TimesheetPayload):

    # Check if timesheet already exists
    for existing_timesheet in timesheets:
        if existing_timesheet["start_date"] == timesheet.start_date:
            return {"error": f"Timesheet for {timesheet.start_date} already exists."}

    # If not then add timesheet
    timesheets.append(timesheet.dict())
    return timesheet.dict()

# DELETE endpoint to remove a timesheet
@app.delete("/timsheets/", response_model=TimesheetPayload)
def delete_timesheet(start_date: date):
    for index, timesheet in enumerate(timesheets):
        if timesheet["start_date"] == start_date:
            deleted_timesheet = timesheets.pop(index)
            return {"message": f"Timesheet for {start_date} deleted successfully."}
    return {"error": f"No timesheet found for {start_date}."}