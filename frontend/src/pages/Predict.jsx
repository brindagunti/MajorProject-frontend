import React, { useState, useEffect } from "react";
import "../assets/styles/predict.css"; // Import the CSS file

export default function Predict() {
  const [symptoms, setSymptoms] = useState([]);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/symptoms")
      .then(res => res.json())
      .then(data => setSymptoms(data))
      .catch(err => console.error(err));
  }, []);

  const handleSelectChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setSelected(selectedValues);
  };

  const handlePredict = () => {
    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms: selected })
    })
      .then(res => res.json())
      .then(data => setResult(data))
      .catch(err => console.error(err));
  };

  return (
    <div className="predict-page">
      <h1 className="predict-title">Predict Disease</h1>

      <div className="dropdown-container">
        <label htmlFor="symptoms" className="dropdown-label">Select Symptoms:</label>
        <select
          id="symptoms"
          multiple
          value={selected}
          onChange={handleSelectChange}
          className="symptom-dropdown"
        >
          {symptoms.map((sym, idx) => (
            <option key={idx} value={sym}>
              {sym}
            </option>
          ))}
        </select>
        <small className="dropdown-note">Hold Ctrl (Windows) or Cmd (Mac) to select multiple symptoms</small>
      </div>

      <button onClick={handlePredict} className="predict-btn">
        Predict
      </button>

      {result && (
        <div className="result-box">
          <h2>{result.disease}</h2>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
          <p>{result.info}</p>
        </div>
      )}
    </div>
  );
}
