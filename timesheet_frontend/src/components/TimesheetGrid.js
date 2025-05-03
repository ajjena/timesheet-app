function getDateForRow(startDate, index) {
  const baseDate = new Date(startDate);
  if (isNaN(baseDate)) return ""; // return blank if invalid

  const date = new Date(baseDate);
  date.setDate(baseDate.getDate() + index);
  return date.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  });
}

function TimesheetGrid({ rows, updateRow, startDate }) {
  return (
    <>
      <h3>Editable Timesheet</h3>
      {rows.map((row, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <div style={{ width: "130px", fontWeight: "bold" }}>{getDateForRow(startDate, i)}:
        </div>
          <input
            type="time"
            value={row.startTime}
            disabled={!row.active}
            style={{ width: "100px", padding: "4px", fontSize: "12px" }}
            onChange={(e) => updateRow(i, { ...row, startTime: e.target.value })}
          />
          <input
            type="time"
            value={row.endTime}
            disabled={!row.active}
            style={{ width: "100px", padding: "4px", fontSize: "12px" }}
            onChange={(e) => updateRow(i, { ...row, endTime: e.target.value })}
          />
          <input
            type="number"
            step="0.25"
            min="0"
            value={row.break_time}
            disabled={!row.active}
            onChange={(e) => updateRow(i, { ...row, break_time: e.target.value })}
            style={{ width: "60px", padding: "6px", fontSize: "12px" }}
          />
          <span style={{ width: "90px", textAlign: "left" }}>→ {row.hoursWorked.toFixed(1)} hours</span>
        </div>
      ))}
    </>
  );
}

export default TimesheetGrid;
