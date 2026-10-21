import { useEffect, useRef } from "react";

class Particle {
    constructor(effect, x, y, r, g, b, a) {
        this.effect = effect;
        this.x = Math.random() * effect.width;
        this.y = Math.random() * effect.height;
        this.originX = x;
        this.originY = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.vx = 0;
        this.vy = 0;
        this.ease = (Math.random() + 0.9) * 0.1;
        this.friction = 0.981;
    }

    update() {
        const { mouse } = this.effect;
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distSq = dx * dx + dy * dy;
        const r = mouse.radius;

        if (distSq < r * r && distSq > 0) {
            const force = -r / distSq;
            this.vx += force * dx;
            this.vy += force * dy;
        }

        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx + (this.originX - this.x) * this.ease;
        this.y += this.vy + (this.originY - this.y) * this.ease;
    }
}

class Effect {
    constructor({ width, height, image, mouse, drawWidth = 400, drawHeight = 400, gap = 3 }) {
        this.width = width;
        this.height = height;
        this.image = image;
        this.mouse = mouse;
        this.drawWidth = drawWidth;
        this.drawHeight = drawHeight;
        this.gap = gap;
        this.size = Math.max(1, gap - 1);
        this.particles = [];
    }

    init() {
        const w = Math.min(this.drawWidth, this.width);
        const h = Math.min(this.drawHeight, this.height);

        const off = document.createElement("canvas");
        off.width = w;
        off.height = h;
        const octx = off.getContext("2d", { willReadFrequently: true });
        octx.drawImage(this.image, 0, 0, this.drawWidth, this.drawHeight);
        const data = octx.getImageData(0, 0, w, h).data;

        for (let y = 0; y < h; y += this.gap) {
            for (let x = 0; x < w; x += this.gap) {
                const i = (y * w + x) * 4;
                const a = data[i + 3];
                if (a === 0) continue;
                this.particles.push(new Particle(this, x, y, data[i], data[i + 1], data[i + 2], a));
            }
        }
    }

    update() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
        }
    }

    render(ctx, imageData) {
        const px = imageData.data;
        const W = this.width;
        const H = this.height;
        const size = this.size;

        px.fill(0);

        for (let n = 0; n < this.particles.length; n++) {
            const p = this.particles[n];
            const x0 = Math.floor(p.x);
            const y0 = Math.floor(p.y);
            const xEnd = Math.min(x0 + size, W);
            const yEnd = Math.min(y0 + size, H);

            for (let y = Math.max(y0, 0); y < yEnd; y++) {
                let i = (y * W + Math.max(x0, 0)) * 4;
                for (let x = Math.max(x0, 0); x < xEnd; x++, i += 4) {
                    px[i] = p.r;
                    px[i + 1] = p.g;
                    px[i + 2] = p.b;
                    px[i + 3] = p.a;
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }
}

export default function ParticleImage({ src, className, gap }) {
    const canvasRef = useRef(null);
    const imageSize = 400;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = imageSize;
        canvas.height = imageSize;

        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const mouse = { x: undefined, y: undefined, radius: 40 };

        let effect = null;
        let frameId = 0;
        let started = false;
        let cancelled = false;

        // Convert client coords to canvas coords, so the position stays
        // correct even if CSS scales or offsets the canvas.
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
            mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
        };

        // Clear the position when the cursor leaves, so particles
        // stop reacting to a stale point.
        const handleMouseLeave = () => {
            mouse.x = undefined;
            mouse.y = undefined;
        };

        const animate = () => {
            effect.update();
            effect.render(ctx, imageData);
            frameId = requestAnimationFrame(animate);
        };

        const start = () => {
            if (started) return;
            started = true;
            observer.disconnect();

            const image = new Image();
            image.onload = () => {
                if (cancelled) return;
                effect = new Effect({
                    width: canvas.width,
                    height: canvas.height,
                    image,
                    mouse,
                    drawWidth: 400,
                    drawHeight: 400,
                    gap: gap,
                });
                effect.init();
                canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
                canvas.addEventListener("mouseleave", handleMouseLeave);
                frameId = requestAnimationFrame(animate);
            };
            image.src = src;
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) start();
            },
            { threshold: 0.2 }
        );
        observer.observe(canvas);

        return () => {
            cancelled = true;
            observer.disconnect();
            cancelAnimationFrame(frameId);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [src]);

    return <canvas ref={canvasRef} className={className}/>;
}