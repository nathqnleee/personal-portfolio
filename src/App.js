import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const phrases = ["CS + Business @ UBC", "Software Developer", "Always striving to make impact"];
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const typingEffect = () => {
      const current = loopNum % phrases.length;
      const fullPhrase = phrases[current];

      if (isDeleting) {
        setCurrentPhrase(fullPhrase.substring(0, currentPhrase.length - 1));
        setTypingSpeed(prevSpeed => prevSpeed / 2);
      } else {
        setCurrentPhrase(fullPhrase.substring(0, currentPhrase.length + 1));
      }

      if (!isDeleting && currentPhrase === fullPhrase) {
        setIsDeleting(true);
        timer = setTimeout(typingEffect, 500);
      } else if (isDeleting && currentPhrase === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      } else {
        timer = setTimeout(typingEffect, typingSpeed);
      }
    };

    timer = setTimeout(typingEffect, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentPhrase, isDeleting, loopNum, phrases, typingSpeed]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nathan Lee</h1>
        <p className="animated-text">{currentPhrase}</p>
        <div className="links">
            <a href="https://www.linkedin.com/in/nathan-lee03/">LinkedIn</a>
            <a href="https://github.com/nathqnleee">GitHub</a>
            <a href="mailto:nsjlee33@hotmail.com">Email</a> 
        </div>
      </header>
    </div>
  );
}

export default App;