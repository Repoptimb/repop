const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 300;
        this.radius = Math.random() * 8 + 1;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
        this.velocity = {
            x: Math.random() * 3 - 1.5,
            y: Math.random() * 3 - 1.5
        };
        this.life = Math.random() * 40 + 10;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.life--;
    }
}

const particles = [];

function createParticles() {
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle());
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        ctx.globalAlpha = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = particles[i].color;
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2);
        ctx.fill();

        if (particles[i].life < 0) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue += 2;
    requestAnimationFrame(animate);
}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
});

document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    animate();
});
