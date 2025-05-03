function StandardWorkHours({ standardStartTime, setStandardStartTime, standardEndTime, setStandardEndTime }) {
  return (
    <>
      <h3>Standard Work Hours</h3>
      <p>Enter your standard start and end times:</p>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label>Start Time:</label>
          <input
            type="time"
            value={standardStartTime}
            onChange={(e) => setStandardStartTime(e.target.value)}
            style={{ width: "140px", padding: "6px", fontSize: "12px" }}
            required
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label>End Time:</label>
          <input
            type="time"
            value={standardEndTime}
            onChange={(e) => setStandardEndTime(e.target.value)}
            style={{ width: "140px", padding: "6px", fontSize: "12px" }}
            required
          />
        </div>
      </div>
    </>
  );
}

export default StandardWorkHours;