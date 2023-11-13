import React, { useRef, useEffect, useState } from 'react';

function SpriteAnimation() {
  const canvasRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const spriteW = 48; // The width of your sprite frame
  const spriteH = 60; // The height of your sprite frame
  const moveSpeed = 5; // How many pixels the sprite moves per arrow key press

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = 'player.png'; // Make sure 'player.png' is the correct path to your sprite sheet

    img.onload = () => {
      // Draw the image to the canvas once it's loaded
      context.drawImage(img, 0, 0, spriteW, spriteH, position.x, position.y, spriteW, spriteH);
    };

    // Function to update the canvas whenever the position state changes
    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      context.drawImage(img, 0, 0, spriteW, spriteH, position.x, position.y, spriteW, spriteH);
    };

    // This function is triggered by the keydown event
    const handleKeyDown = (e) => {
      e.preventDefault();
      switch (e.key) {
        case '37':
          setPosition((prev) => ({ ...prev, x: prev.x - moveSpeed }));
          break;
        case 39:
          setPosition((prev) => ({ ...prev, x: prev.x + moveSpeed }));
          break;
        case 'ArrowUp':
          setPosition((prev) => ({ ...prev, y: prev.y - moveSpeed }));
          break;
        case 'ArrowDown':
          setPosition((prev) => ({ ...prev, y: prev.y + moveSpeed }));
          break;
        default:
          break;
      }
    };

    // Attach the event listener for the arrow keys
    window.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Effect to re-draw the sprite whenever its position changes
  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      const img = new Image();
      img.src = 'player.png'; // Your sprite image path

      img.onload = () => {
        // The draw function needs to be called here again to update the sprite's position
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(img, 0, 0, spriteW, spriteH, position.x, position.y, spriteW, spriteH);
      };
    }
  }, [position]); // Only re-run the effect if the position changes

  return <canvas ref={canvasRef} width="600" height="400" />;
}

export default SpriteAnimation;