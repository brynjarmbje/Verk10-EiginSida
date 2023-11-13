import React, { useEffect, useRef } from 'react';

const SpriteAnimator = () => {
  const canvasRef = useRef(null);
  const spriteW = 48;
  const spriteH = 60;

  useEffect(() => {
    const img = new Image();
    img.src = 'player.png'; // Make sure this path is correct in your project
    let currentCycle = 0;

    img.onload = () => {
      const interval = setInterval(() => {
        const canvas = canvasRef.current;
        const cx = canvas.getContext('2d');
        cx.clearRect(0, 0, spriteW, spriteH);
        cx.drawImage(img,
          // source rectangle
          currentCycle * spriteW, 0, spriteW, spriteH,
          // destination rectangle
          0, 0, spriteW, spriteH
        );
        currentCycle = (currentCycle + 1) % 8;
      }, 300);

      return () => clearInterval(interval);
    };
  }, []); // Removed cycle from dependency array

  return <canvas ref={canvasRef} width={spriteW} height={spriteH} />;
};

export default SpriteAnimator;