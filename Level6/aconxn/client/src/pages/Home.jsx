import React from 'react';
import '../cssfiles/home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-left">
        <h1>ACONXN<span className="trademark">™</span></h1>
        <h3>The place to connect with those important to you</h3>
      </div>
      <div className="home-right">
        <div className="login-container">
          {/* Your login component or login form goes here */}
          <h2>Login</h2>
          <form>
            <div>
              <label>Username:</label>
              <input type="text" name="username" />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

