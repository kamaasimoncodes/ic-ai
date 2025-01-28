import React, { useState } from "react";

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [response, setResponse] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchHistory([searchQuery, ...searchHistory]);
      // Simulate AI response
      setResponse(`Here is your AI-generated response for: "${searchQuery}"`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    alert("You have been logged out.");
  };

  return (
    <div className="main-container">
      <header className="main-header">
        <img src="../../public/w.jpg" alt="FitAI Logo" className="logo" />
        <h1>FitAI</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="main-content">
        <div className="search-section">
          <input
            type="text"
            placeholder="Ask FitAI anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="response-section">
          {response && (
            <div className="ai-response">
              <p>{response}</p>
            </div>
          )}
        </div>

        <div className="history-section">
          <h2>Search History</h2>
          <ul>
            {searchHistory.map((query, index) => (
              <li key={index} className="history-item">
                {query}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="main-footer">
        <p>Powered by AI. Transforming your fitness journey.</p>
      </footer>
    </div>
  );
};

export default MainPage;
