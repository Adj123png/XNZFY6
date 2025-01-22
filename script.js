const wishes = [
  '2025 新年快乐！',
  '愿你新的一年万事如意！',
  '好运连连，财源滚滚！',
  '家庭幸福，平安健康！',
  '新的一年，心想事成！',
  '梦想成真，福气满满！'
];

const messageElement = document.getElementById('message');
const fireworksCanvas = document.getElementById('fireworks');
const ctx = fireworksCanvas.getContext('2d');
let particles = [];
let currentIndex = 0;
let currentCharIndex = 0;
let typingInterval;

function typeText() {
  if (currentCharIndex < wishes[currentIndex].length) {
    messageElement.textContent += wishes[currentIndex][currentCharIndex];
    currentCharIndex++;
  } else {
    clearInterval(typingInterval);
    // 这里我们增加一个小停顿，然后开始下一段文字或烟花
    setTimeout(() => {
      if (currentIndex < wishes.length - 1) {
        // 移动到下一段文字
        currentIndex++;
        currentCharIndex = 0;
        messageElement.textContent = ''; // 清空当前文本
        typingInterval = setInterval(typeText, 50); // 开始打下一段文字
      } else {
        // 所有文字显示完毕，启动烟花
        messageElement.style.display = 'none';
        fireworksCanvas.style.display = 'block';
        animateFireworks();
      }
    }, 1500); // 每段文字结束后的停顿时间
  }
}

function animateFireworks() {
  function resizeCanvas() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function createFirework() {
    const x = Math.random() * fireworksCanvas.width;
    const y = Math.random() * fireworksCanvas.height / 2;
    const colors = ['255, 99, 71', '144, 238, 144', '135, 206, 250', '238, 130, 238'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 100; i++) {
      const speed = Math.random() * 5 + 3;
      const angle = Math.random() * Math.PI * 2;
      particles.push({
        x: x,
        y: y,
        size: Math.random() * 5 + 2,
        color: color,
        speed: speed,
        angle: angle,
        opacity: 1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    particles = particles.filter(p => p.opacity > 0);

    particles.forEach(particle => {
      particle.x += particle.speed * Math.cos(particle.angle);
      particle.y += particle.speed * Math.sin(particle.angle);
      particle.opacity -= 0.02;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
      ctx.fill();
    });

    if (Math.random() < 0.05) {
      createFirework();
    }

    requestAnimationFrame(draw);
  }

  draw();
}

// 开始打字动画
typingInterval = setInterval(typeText, 50);
