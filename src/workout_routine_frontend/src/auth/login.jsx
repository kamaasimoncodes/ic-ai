import React from 'react'
import { useAuth } from './authetictae';
import { useNavigate } from 'react-router-dom';


const AuthLoginOut = () => {
  const { isAuthenticated, login, principal, logout } = useAuth();
  const navigate=useNavigate()
  return (
    <>
      {isAuthenticated ? (
        <button
        className="get-started-btn"
        onClick={()=>navigate("/main")}
      >
        get-started
      </button>
      ) : (
        <button
          className="logout-btn"
          onClick={login}
        >
          Log in
        </button>
      )}
    </>
  )
}

export default AuthLoginOut;