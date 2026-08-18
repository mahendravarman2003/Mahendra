import React, { useEffect, useRef } from "react";

export default function WaterSplashBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const ripples = [];
    const particles = [];
    const ambientDrops = [];

    // Initialize subtle floating ambient water mist/bubbles
    const dropCount = Math.min(30, Math.floor(width / 50));
    for (let i = 0; i < dropCount; i++) {
      ambientDrops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // Create water splash at coordinate (x, y)
    const createSplash = (x, y, isClick = false) => {
      // 1. Concentric Expanding Water Ripples
      const ringCount = isClick ? 3 : 1;
      for (let i = 0; i < ringCount; i++) {
        ripples.push({
          x,
          y,
          radius: 2 + i * 8,
          maxRadius: isClick ? Math.random() * 60 + 90 : Math.random() * 25 + 35,
          speed: isClick ? Math.random() * 2.5 + 3 : 2,
          opacity: isClick ? 0.7 - i * 0.15 : 0.35,
          lineWidth: isClick ? 2.5 - i * 0.5 : 1.2,
          color: i % 2 === 0 ? "114, 224, 255" : "0, 240, 255",
        });
      }

      // 2. Outward Splashing Water Droplets on click / energetic movement
      const particleCount = isClick ? 22 : 3;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = isClick
          ? Math.random() * 5 + 2
          : Math.random() * 2 + 0.5;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          radius: isClick ? Math.random() * 2.5 + 1 : Math.random() * 1.5 + 0.5,
          alpha: isClick ? 0.9 : 0.45,
          decay: isClick ? Math.random() * 0.02 + 0.015 : 0.03,
          friction: 0.94,
          color: Math.random() > 0.4 ? "114, 224, 255" : "180, 242, 255",
        });
      }
    };

    let lastMove = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMove > 45) {
        // Throttle ripple emission for smooth performance
        createSplash(e.clientX, e.clientY, false);
        lastMove = now;
      }
    };

    const handleClick = (e) => {
      createSplash(e.clientX, e.clientY, true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Ambient Floating Water Droplets
      for (let i = 0; i < ambientDrops.length; i++) {
        const drop = ambientDrops[i];
        drop.y += drop.speedY;
        drop.x += drop.speedX;

        if (drop.y < -10) {
          drop.y = height + 10;
          drop.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(114, 224, 255, ${drop.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#72e0ff";
        ctx.fill();
      }

      // 2. Draw Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity -= 0.008;

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r.color}, ${Math.max(0, r.opacity)})`;
        ctx.lineWidth = r.lineWidth;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${r.color}, 0.6)`;
        ctx.stroke();

        // Inner soft caustic glow
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(1, r.radius * 0.85), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r.color}, ${Math.max(0, r.opacity * 0.4)})`;
        ctx.lineWidth = r.lineWidth * 0.5;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Draw Water Droplets & Splash Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#72e0ff";
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="water-splash-canvas" />;
}
