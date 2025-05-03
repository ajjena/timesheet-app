function ServerResponse({ response }) {
    if (!response) return null;
  
    return (
      <div style={{ marginTop: "20px" }}>
        <h3>Server Response:</h3>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    );
  }
  
  export default ServerResponse;  