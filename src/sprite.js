import React, { useRef, useEffect, useState } from 'react';

function SpriteAnimation() {
  const canvasRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const moveSpeed = 4; // The speed of the sprite
  const spriteW = 48; // The width of your sprite frame
  const spriteH = 60; // The height of your sprite frame

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = 'player.png'; // Replace with the path to your sprite image
    
    let moveDirection = 'right'; // Initial movement direction

    img.onload = () => {
      // Initial draw
      context.drawImage(img, 0, 0, spriteW, spriteH, position.x, position.y, spriteW, spriteH);
    };

    // Function to update the sprite's position
    const updatePosition = () => {
      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        // Update the position based on the direction
        switch (moveDirection) {
          case 'right':
            newX += moveSpeed;
            if (newX >= canvas.width - spriteW) { // Change direction when reaching the edge
              moveDirection = 'down';
            }
            break;
          case 'down':
            newY += moveSpeed;
            if (newY >= canvas.height - spriteH) {
              moveDirection = 'left';
            }
            break;
          case 'left':
            newX -= moveSpeed;
            if (newX <= 0) {
              moveDirection = 'up';
            }
            break;
          case 'up':
            newY -= moveSpeed;
            if (newY <= 0) {
              moveDirection = 'right';
            }
            break;
          default:
            break;
        }
        return { x: newX, y: newY };
      });
    };

    // Set an interval to move the sprite every 50ms
    const intervalId = setInterval(updatePosition, 50);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Effect to redraw the sprite whenever its position changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = 'player.png'; // Replace with the path to your sprite image

    img.onload = () => {
      // The draw function needs to be called here again to update the sprite's position
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, spriteW, spriteH, position.x, position.y, spriteW, spriteH);
    };
  }, [position]); // Only re-run the effect if the position changes

  return <canvas ref={canvasRef} width="600" height="400" />;
}

export default SpriteAnimation;