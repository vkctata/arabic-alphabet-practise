import React, { useState, useEffect, useRef } from 'react';
import './App.css';

interface Alphabet {
  name: string;
  letter: string;
}

const alphabets: Alphabet[] = [
  { name: 'Alif', letter: 'ا' },
  { name: 'Ba', letter: 'ب' },
  { name: 'Ta', letter: 'ت' },
  { name: 'Tha', letter: 'ث' },
  { name: 'Jim', letter: 'ج' },
  { name: 'Ha', letter: 'ح' },
  { name: 'Kha', letter: 'خ' },
  { name: 'Dal', letter: 'د' },
  { name: 'Thal', letter: 'ذ' },
  { name: 'Ra', letter: 'ر' },
  { name: 'Za', letter: 'ز' },
  { name: 'Sin', letter: 'س' },
  { name: 'Shin', letter: 'ش' },
  { name: 'Sad', letter: 'ص' },
  { name: 'Dad', letter: 'ض' },
  { name: 'Ta', letter: 'ط' },
  { name: 'Za', letter: 'ظ' },
  { name: 'Ain', letter: 'ع' },
  { name: 'Ghain', letter: 'غ' },
  { name: 'Fa', letter: 'ف' },
  { name: 'Qa', letter: 'ق' },
  { name: 'Kaf', letter: 'ك' },
  { name: 'Lam', letter: 'ل' },
  { name: 'Mim', letter: 'م' },
  { name: 'Nun', letter: 'ن' },
  { name: 'Ha', letter: 'ه' },
  { name: 'Wa', letter: 'و' },
  { name: 'Ya', letter: 'ي' },
];

const App: React.FC = () => {
  const [currentAlphabetIndex, setCurrentAlphabetIndex] = useState(0);
  const [practiceAttempts, setPracticeAttempts] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    const savedProgress = localStorage.getItem('alphabetProgress');
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress);
      setCurrentAlphabetIndex(progressData.currentAlphabetIndex);
      setPracticeAttempts(progressData.practiceAttempts);
    }
  };

  const saveProgress = () => {
    const progressData = {
      currentAlphabetIndex,
      practiceAttempts,
    };
    localStorage.setItem('alphabetProgress', JSON.stringify(progressData));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const touchX = event.touches[0].clientX - canvas.offsetLeft;
    const touchY = event.touches[0].clientY - canvas.offsetTop;

    if (ctx.isPointInPath(touchX, touchY)) {
      setPracticeAttempts(practiceAttempts + 1);
    }

    if (practiceAttempts >= 50) {
      setCurrentAlphabetIndex((currentAlphabetIndex + 1) % alphabets.length);
      setPracticeAttempts(0);
      saveProgress();
    }
  };

  const handleNextAlphabet = () => {
    setCurrentAlphabetIndex((currentAlphabetIndex + 1) % alphabets.length);
    setPracticeAttempts(0);
    saveProgress();
  };

  const handleResetPractice = () => {
    setPracticeAttempts(0);
  };

  const currentAlphabet = alphabets[currentAlphabetIndex];

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '300px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#cccccc'; // Set the text color to a lighter shade


    // Draw the alphabet
    ctx.fillText(currentAlphabet.letter, canvas.width / 2, canvas.height / 2);
  }, [currentAlphabetIndex]);

  return (
    <div className="App">
      <div className="container">
        <canvas
          id="alphabetCanvas"
          width={500}
          height={500}
          ref={canvasRef}
          onTouchStart={handleTouchStart}
        >
          Your browser does not support the HTML5 canvas tag.
        </canvas>

        <div className="progress">
          <span>{currentAlphabet.name}</span> <br/>
          <span>Practice Count: {practiceAttempts}/50</span>
        </div>
        <div className="controls">
          <button onClick={handleNextAlphabet}>Next Alphabet</button> &nbsp;
          <button onClick={handleResetPractice}>Reset Practice</button>
        </div>
      </div>
    </div>
  );
};

export default App;