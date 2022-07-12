import React, { useCallback, useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';

import { Circle, Rectangle, Shape, Triangle } from './shapes';

const Canvas = tw.canvas`w-full h-full opacity-0 transition-opacity duration-300`;

const visible = tw`opacity-100`;

const Shapes = [Triangle, Rectangle, Circle];

// https://tailwindcss.com/docs/customizing-colors
const colors = [
  // '#71717a',
  // '#737373',
  // '#78716c',
  // '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
];

export type ShapeEffectProps = {
  count: number;
  sizes: [min: number, max: number];
};

export default function ShapeEffect(props: ShapeEffectProps) {
  const { count, sizes } = props;

  const [mounted, setMounted] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const shapes = useRef<Shape[]>([]);

  const resize = useCallback(() => {
    if (!canvas.current) return;

    const rect = canvas.current.getBoundingClientRect();
    canvas.current.width = rect.width;
    canvas.current.height = rect.height;
  }, []);

  const fill = useCallback(() => {
    if (!canvas.current) return;
    const ctxWidth = canvas.current.width;
    const ctxHeight = canvas.current.height;
    const firstTime = shapes.current.length === 0;

    while (shapes.current.length < count) {
      const ShapeCtor = Shapes[Math.floor(Math.random() * Shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = sizes[0] + Math.random() * (sizes[1] - sizes[0]);
      const x = firstTime ? Math.random() * ctxWidth : -size;
      const y = Math.random() * ctxHeight;

      shapes.current.push(new ShapeCtor(x, y, size, color));
    }
  }, []);

  const draw = useCallback(() => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext('2d')!;
    const ctxWidth = canvas.current.width;
    const ctxHeight = canvas.current.height;

    ctx.clearRect(0, 0, ctxWidth, ctxHeight);

    shapes.current.forEach((shape) => {
      shape.move();
      shape.draw(ctx);
    });

    shapes.current = shapes.current.filter((shape) => {
      return shape.x - shape.size < ctxWidth;
    });
  }, []);

  const tick = useCallback(() => {
    fill();
    draw();
    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    resize();
    tick();
    setMounted(true);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <Canvas ref={canvas} css={[mounted && visible]} />;
}
