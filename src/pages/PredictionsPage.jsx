import React from "react";

const PredictionsPage = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        src="http://localhost:8501/"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Predictions"
      />
    </div>
  );
};

export default PredictionsPage;
