function BreakInput({ standardBreakHours, setStandardBreakHours }) {
    return (
      <>
        <h3>Typical Break</h3>
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label>Break (in hours):</label>
            <input
              type="number"
              min="0"
              step="0.25"
              value={standardBreakHours}
              onChange={(e) => setStandardBreakHours(e.target.value)}
              style={{ width: "100px", padding: "6px", fontSize: "12px" }}
              required
            />
          </div>
        </div>
      </>
    );
  }
  
  export default BreakInput;  