import React, { useState, useEffect } from "react";
import "./App.css";
import ThemeButton from "./ThemeButton";
import logo from "./assets/Object Detection.svg";

function App() {
  // Get the initial theme and isDetecting states from localStorage
  const storedTheme = localStorage.getItem("theme") || "light";
  const storedDetectionState = localStorage.getItem("isDetecting") === "true"; // Convert string to boolean

  const [theme, setTheme] = useState(storedTheme);
  const [isDetecting, setIsDetecting] = useState(storedDetectionState);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Toggle theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Handle start detection
  const handleStart = () => {
    setRetryCount(0);
    setIsDetecting(true);
    setError(false);
    localStorage.setItem("isDetecting", true);
  };

  // Handle stop detection
  const handleStop = () => {
    setIsDetecting(false);
    localStorage.setItem("isDetecting", false);
  };

  // Error handling for the image loading failure
  const handleError = () => {
    if (retryCount < maxRetries) {
      setRetryCount((prev) => prev + 1);
      // Attempt to reconnect after 2 seconds
      setTimeout(() => {
        setIsDetecting(true);
      }, 2000);
    } else {
      setError(true);
      setIsDetecting(false);
      setRetryCount(0);
      localStorage.setItem("isDetecting", false);
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="App">
      <nav className="App-nav">
        <img src={logo} alt="logo" id="logo" />
        <ThemeButton theme={theme} toggleTheme={toggleTheme} />
      </nav>
      <div className="Buttons">
        <button onClick={handleStart}>Start Detection</button>
        <button onClick={handleStop}>Stop Detection</button>
      </div>
      <div className="Detection">
        {/* Show MJPEG stream when detection is started */}
        {isDetecting && (
          <img
            src="https://c2ab-122-15-88-227.ngrok-free.app/video_feed"
            alt="MJPEG Stream"
            onError={handleError}
          />
        )}
        {/* Show a message when detection is stopped */}
        {!isDetecting && !error && (
          <h1 className="ErrorModal">Start Detection</h1>
        )}

        {/* Custom error message */}
        {error && (
          <div className="ErrorModal">
            <h2>Unable to load the video stream</h2>
            <button onClick={() => setError(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
