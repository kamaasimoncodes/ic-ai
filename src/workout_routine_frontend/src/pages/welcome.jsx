import React from 'react';
import { useNavigate } from 'react-router-dom';


const WelcomePage = () => {
    const router=useNavigate();
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1>Welcome to FitAI</h1>
        <p>Your personal AI-powered fitness companion.</p>
      </header>

      <main className="welcome-main">
        <img 
          src="../../public/w.jpg" 
          alt="Workout illustration" 
          className="welcome-image"
        />
        <p>
          Get personalized workout plans, real-time guidance, and progress tracking—all tailored to your fitness goals.
        </p>
        <button className="get-started-btn" onClick={() => router("/main")}>
          Get Started
        </button>
      </main>

      <footer className="welcome-footer">
        <p>Powered by AI. Transforming your fitness journey.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
