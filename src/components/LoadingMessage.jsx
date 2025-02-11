import React, { useState, useEffect } from 'react';

const LoadingMessage = () => {
  const [dots, setDots] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  
  const cookingMessages = [
    "Chopping ingredients in julienne style",
    "Adding a pinch of Chef's magic",
    "The kitchen is starting to smell amazing",
    "Stirring with love and care",
    "Adjusting the seasoning to perfection",
    "Plating with artistic flair",
    "Making sure everything is just right",
    "Adding that secret ingredient",
    "Taste testing (someone has to do it!)",
    "Getting that temperature just perfect"
  ];

  useEffect(() => {
    // Animação dos pontos
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    // Troca de mensagens
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % cookingMessages.length);
    }, 3000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">
        {cookingMessages[messageIndex]}{dots}
      </p>
    </div>
  );
};

export default LoadingMessage;