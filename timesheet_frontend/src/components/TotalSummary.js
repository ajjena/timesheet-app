function TotalSummary({ totalWeek1, totalWeek2, totalTimesheet }) {
  return (
    <>
      {/* Total row */}
      <div style={{ fontWeight: "bold", marginTop: "30px", textAlign: "left" }}>
        TOTAL HOURS: {totalTimesheet.toFixed(1)} hours
      </div>

      {/* Breakdown */}
      <div style={{ marginTop: "5px", textAlign: "left", fontSize: "14px", color: "#666" }}>
        <div>(Total Week 1: {totalWeek1.toFixed(1)} hours)</div>
        <div>(Total Week 2: {totalWeek2.toFixed(1)} hours)</div>
      </div>
    </>
  );
}

export default TotalSummary;