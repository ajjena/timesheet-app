import { useState, useEffect } from "react";
import BreakInput from "./components/BreakInput";
import DownloadPDF from "./components/DownloadPDF";
import EmployeeDetails from "./components/EmployeeDetails";
import ServerResponse from "./components/ServerResponse";
import StandardWorkHours from "./components/StandardWorkHours";
import TimesheetGrid from "./components/TimesheetGrid";
import TotalSummary from "./components/TotalSummary";
import WorkDaysSelector from "./components/WorkDaysSelector";

function App() {

  // Basic details for timesheet
  const [employeeName, setEmployeeName] = useState("");
  const [startDate, setStartDate] = useState("");

  // Set up standard work schedule details
  const [checkedDays, setCheckedDays] = useState([true, true, true, true, true, false, false]);
  const [standardStartTime, setStandardStartTime] = useState("09:00");
  const [standardEndTime, setStandardEndTime] = useState("17:00");
  const [standardBreakHours, setStandardBreakHours] = useState("0.5");

  // Represent timesheet
  const [timesheetRows, setTimesheetRows] = useState(
    Array(14).fill(null).map((_, i) => ({
      dayIndex: i % 7,
      week: i < 7 ? 1 : 2,
      startTime: "",
      endTime: "",
      break_time: 0,
      hoursWorked: 0,
      active: [true, true, true, true, true, false, false][i % 7], // automatically fill Monday to Friday
    }))
  );  

  const [response, setResponse] = useState(null);

  // Calculate weekly total hours based on current timesheetRows
  const totalWeek1 = timesheetRows.slice(0, 7).reduce((sum, row) => sum + row.hoursWorked, 0);
  const totalWeek2 = timesheetRows.slice(7, 14).reduce((sum, row) => sum + row.hoursWorked, 0);
  const totalTimesheet = totalWeek1 + totalWeek2;

  // Automatically fills timehsheet with ticked days
  const handleCheckboxChange = (index, value) => {
    const newCheckedDay = [...checkedDays];
    newCheckedDay[index] = value;
    setCheckedDays(newCheckedDay);
  };

  // Sends timesheet data to backend
  const handleSubmit = async (e) => {

    // Stop the page from refreshing
    e.preventDefault();

    // Create the object to be sent to the backend
    const payload = {
      employee_name: employeeName,
      start_date: startDate,
      timesheet: timesheetRows,
      week1_total: timesheetRows.slice(0, 7).reduce((sum, row) => sum + row.hoursWorked, 0),
      week2_total: timesheetRows.slice(7, 14).reduce((sum, row) => sum + row.hoursWorked, 0)
    };

    // Send a POST request to the backend server
    const res = await fetch("http://localhost:8000/timesheets/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Save the server's response
    const data = await res.json();
    setResponse(data);
  };

  // Update timesheet when standard hours or work days change
  useEffect(() => {
    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours + minutes / 60;
    };

    const workStart = parseTime(standardStartTime);
    const workEnd = parseTime(standardEndTime);
    const breakHours = parseFloat(standardBreakHours || "0");
    const dailyHours = Math.max(0, workEnd - workStart - breakHours);

    setTimesheetRows((prevRows) =>
      prevRows.map((row, i) => {
        const isWorkDay = checkedDays[row.dayIndex];
        if (!row.manuallyEdited) {
          return {
            ...row,
            startTime: isWorkDay ? standardStartTime : "",
            endTime: isWorkDay ? standardEndTime : "",
            break_time: isWorkDay ? breakHours : 0,
            hoursWorked: isWorkDay ? dailyHours : 0,
            active: isWorkDay,
          };
        }
        return row;
      })
    );
  }, [standardStartTime, standardEndTime, standardBreakHours, checkedDays]);

  const updateRow = (index, newRow) => {
    const updated = [...timesheetRows];
    const [sH, sM] = newRow.startTime.split(":").map(Number);
    const [eH, eM] = newRow.endTime.split(":").map(Number);
    const start = sH + sM / 60;
    const end = eH + eM / 60;
    const breakH = parseFloat(newRow.break_time || 0);
    newRow.hoursWorked = Math.max(0, end - start - breakH);
    newRow.manuallyEdited = true; 
    updated[index] = newRow;
    setTimesheetRows(updated);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", height: "100vh" }}>
      {/* LEFT PANEL */}
      <div style={{ flex: 1, padding: "20px", borderRight: "1px solid #ccc" }}>
        <h1>Create Timesheet</h1>

        <EmployeeDetails
          employeeName={employeeName}
          setEmployeeName={setEmployeeName}
          startDate={startDate}
          setStartDate={setStartDate}
        />

        <hr style={{ border: "1px solid #ccc", margin: "20px 0" }} />
        <p>Fill out the details below to pre-fill your timesheet</p>

        <WorkDaysSelector
          checkedDays={checkedDays}
          handleCheckboxChange={handleCheckboxChange}
        />

        <StandardWorkHours
          standardStartTime={standardStartTime}
          setStandardStartTime={setStandardStartTime}
          standardEndTime={standardEndTime}
          setStandardEndTime={setStandardEndTime}
        />

        <BreakInput
          standardBreakHours={standardBreakHours}
          setStandardBreakHours={setStandardBreakHours}
        />
      </div>

      {/* RIGHT PANEL */}
      <div style={{ flex: 1, padding: "20px" }}>
        <TimesheetGrid
          rows={timesheetRows}
          updateRow={updateRow}
          startDate={startDate}
        />

        <div style={{ marginTop: "24px" }}>
          <TotalSummary
            totalWeek1={totalWeek1}
            totalWeek2={totalWeek2}
            totalTimesheet={totalTimesheet}
          />

          <DownloadPDF
            employeeName={employeeName}
            startDate={startDate}
            timesheet={timesheetRows}
            week1Total={totalWeek1}
            week2Total={totalWeek2}
          />

          {response && (
            <ServerResponse data={response} />
          )}
        </div>
      </div>
    </form>
  );
}

export default App;