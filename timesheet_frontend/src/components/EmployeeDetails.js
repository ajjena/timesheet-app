function EmployeeDetails({ employeeName, setEmployeeName, startDate, setStartDate }) {
    return (
      <>
        <div style={{ marginBottom: "20px" }}>
          <h3>Employee Name</h3>
          <p>Enter your full name:</p>
          <input 
            value={employeeName} 
            onChange={(e) => setEmployeeName(e.target.value)} 
            style={{ width: "240px", padding: "8px", fontSize: "16px" }}
            required />
        </div>
  
        <div style={{ marginBottom: "20px" }}>
          <h3>Start Date</h3>
          <p>Enter the date of the start of the timesheet period:</p>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            style={{ width: "160px", padding: "8px", fontSize: "12px" }}
            required />
        </div>
      </>
    );
  }
  
  export default EmployeeDetails;  