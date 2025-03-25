import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useAuth } from "../auth/authetictae";
import { workout_routine_backend } from "declarations/workout_routine_backend";
const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [response, setResponse] = useState("");
  const { isAuthenticated, login, principal, logout } = useAuth();
  const genAi = new GoogleGenerativeAI(process.env.VITE_API_KEY);

  workout_routine_backend.registeruser().then((result) => {});

  useEffect(() => {
    workout_routine_backend.getAllHistory().then((result) => {
      setSearchHistory(result[0].history);
    });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
        const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `advice user about ${searchQuery} diet and should be less than 300 words `;

      const result = await model.generateContent(prompt);
      const response = result.response;

      if (!response) {
        console.error("No response from AI model");
        return;
      }
      const text = await response.text(); // Await the text extraction

      setResponse(text);

      console.log(text, "Generated Response");

      // Update user search history
      await workout_routine_backend
        .usersearch(searchQuery, text)
        .then((result) => {
          console.log(result, "update history");
        });

      const historyResult = await workout_routine_backend.getAllHistory();
      setSearchHistory(historyResult[0].history);
    } catch (error) {
      console.error("Error handling search:", error);
    }

    workout_routine_backend.getAllHistory().then((result) => {
      console.log(result, "get history");
    });
  };

  const handleLogout = () => {
    alert("You have been logged out.");
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="main-container">
            <header className="main-header">
              <img
                src="../../public/w.jpg"
                alt="DietAI Logo"
                className="logo"
              />
              <h1>DietAI</h1>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </header>

            <main className="main-content">
              <div className="search-section">
                <form action="" onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Ask DietAI anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button className="search-btn" type="submit">
                    Search
                  </button>
                </form>
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
                  {searchHistory.map((val, index) => (
                    <li
                      key={index}
                      className="history-item"
                      onClick={() => setResponse(val.response)}
                    >
                      {val.request}
                    </li>
                  ))}
                </ul>
              </div>
            </main>

            <footer className="main-footer">
              <p>Powered by AI. Transforming your nutrition journey.</p>
            </footer>
          </div>
        </>
      ) : (
        <>
          <div className="no">must be logeed in</div>
        </>
      )}
    </>
  );
};

export default MainPage;
