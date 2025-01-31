import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLoginOut from '../auth/login';


const WelcomePage = () => {
    const router=useNavigate();
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1>Welcome to DietAI</h1>
        <p> Transform your nutrition journey with artificial intelligence.</p>
      </header>

      <main className="welcome-main">
        <img 
          src="../../public/w.jpg" 
          alt="Workout illustration" 
          className="welcome-image"
        />
        <p>
          Get personalized Diet plans, real-time guidance, and progress tracking—all tailored to your diet goals.
        </p>
        <AuthLoginOut/>
      </main>

      <footer className="welcome-footer">
        <p>Powered by AI. Transforming your nutrition journey.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
