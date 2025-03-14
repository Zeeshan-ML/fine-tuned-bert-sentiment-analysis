import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <header className="main-header">
        <h1>Fine Tuned Bert Base Model</h1>
        <p>Unlock the emotion behind your text with AI</p>
      </header>
      <div className="card-container">
        <div className="card">
          <div className="card-header">
            <h2>BERT Sentiment Analyzer</h2>
            <p>Discover insights from your text</p>
          </div>
          <form onSubmit={handleSubmit} className="card-form">
            <label htmlFor="textInput" className="form-label">Enter Your Text</label>
            <textarea
              id="textInput"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something engaging..."
              className="form-textarea"
              rows="6"
            />
            <button type="submit" className="form-button">
              {loading ? "Analyzing..." : "Analyze Sentiment"}
            </button>
          </form>
          {result && (
            <div className="result-section">
              <h3>Result</h3>
              <p><strong>Sentiment:</strong> {result.label}</p>
              <p><strong>Confidence:</strong> {(result.score * 100).toFixed(2)}%</p>
            </div>
          )}
        </div>
      </div>
      <footer className="main-footer">
        <p>© {new Date().getFullYear()} Sentiment Insights. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
