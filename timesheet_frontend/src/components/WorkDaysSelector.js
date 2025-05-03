const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function WorkDaysSelector({ checkedDays, handleCheckboxChange }) {
  return (
    <>
      <h3>Standard Work Days</h3>
      <p>Tick the days of the week that you typically work:</p>
      <div style={{ display: "flex", gap: "12px", marginTop: "8px", marginBottom: "16px" }}>
        {daysOfWeek.map((day, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                checked={checkedDays[index]}
                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
              />
              {day}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default WorkDaysSelector;
