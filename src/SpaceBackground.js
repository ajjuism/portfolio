import React, { useEffect, useRef } from 'react';
import './SpaceBackground.css';
import { faMusic, faCamera } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Particle {
  constructor(x, y, size, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Loop particles when they go off-screen
    if (this.x < 0) this.x = window.innerWidth;
    if (this.x > window.innerWidth) this.x = 0;
    if (this.y < 0) this.y = window.innerHeight;
    if (this.y > window.innerHeight) this.y = 0;
  }
}

const SpaceBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function createParticles() {
      const particleCount = 1000;

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        const color = `rgba(255, 255, 255, ${Math.random()})`;
        const speedX = Math.random() * 0.5 - 0.25;
        const speedY = Math.random() * 0.5 - 0.25;

        particles.push(new Particle(x, y, size, color, speedX, speedY));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    }

    createParticles();
    animate();
  }, []);

  return (
    <div className="spaceWrapper">
      <div className="hero">
        <video className="heroVideo" src="/src/video.mp4" autoPlay muted loop></video>
        <div className="animatedBackground"></div>
        <h1 className="heroHeading">Hey there, I'm Arjun!👋</h1>
        <p className="description">
          I ask questions for a living and I do stuff on the internet for fun.
        </p>
            <div className="heroButtons">
          <a href="https://open.spotify.com/artist/269gZQtoOtpGEeiK9Chz3f" target="_blank" rel="noopener noreferrer">
            <button className="heroButton">
              <FontAwesomeIcon icon={faMusic} /> Spotify
            </button>
          </a>
          <a href="https://www.instagram.com/ajjuism/" target="_blank" rel="noopener noreferrer">
            <button className="heroButton">
              <FontAwesomeIcon icon={faCamera} /> Instagram
            </button>
          </a>
          <a href="https://twitter.com/ajjuism" target="_blank" rel="noopener noreferrer">
            <button className="heroButton">
              <FontAwesomeIcon icon={faTwitter} /> Twitter
            </button>
          </a>
          <a href="https://github.com/ajjuism" target="_blank" rel="noopener noreferrer">
            <button className="heroButton">
              <FontAwesomeIcon icon={faGithub} /> Github
            </button>
          </a>
        </div>
      </div>
      <canvas ref={canvasRef} className="spaceCanvas"></canvas>
    </div>
  );
};

export default SpaceBackground;
