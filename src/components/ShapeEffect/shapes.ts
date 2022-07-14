interface Point {
  x: number;
  y: number;
}

function createPolygonPath2D(points: Point[]) {
  const path = new Path2D();

  points.forEach((point, index) => {
    if (index === 0) {
      path.moveTo(point.x, point.y);
    } else {
      path.lineTo(point.x, point.y);
    }
  });

  return path;
}

export abstract class Shape implements Point {
  x: number;

  y: number;

  size: number;

  color: string;

  angle = 2 * Math.PI * Math.random();

  rotate = Math.random() * Math.PI;

  speed = 0.2 + Math.random() * 1.5;

  constructor(x: number, y: number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  move() {
    this.x += this.speed;
    this.rotate -= this.speed * 0.006;
  }

  createGradient(ctx: CanvasRenderingContext2D) {
    const size = this.size * 1.5;
    const endAngle = this.angle + Math.PI;

    const startX = this.x + this.size * Math.sin(this.angle + this.rotate);
    const startY = this.y + this.size * Math.cos(this.angle + this.rotate);
    const endX = this.x + size * Math.sin(endAngle + this.rotate);
    const endY = this.y + size * Math.cos(endAngle + this.rotate);

    const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(0.3, this.color);
    gradient.addColorStop(0.85, '#ffffff');

    return gradient;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}

export class Polygon extends Shape {
  sides: number;

  constructor(
    x: number,
    y: number,
    size: number,
    color: string,
    sides: number
  ) {
    super(x, y, size, color);
    this.sides = sides;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const halfSize = this.size / 2;
    const angle = (Math.PI * 2) / this.sides;
    const points: Point[] = [];

    Array.from({ length: this.sides }).forEach((_, i) => {
      points.push({
        x: this.x + halfSize * Math.sin(angle * i + this.rotate),
        y: this.y + halfSize * Math.cos(angle * i + this.rotate),
      });
    });

    const path = createPolygonPath2D(points);
    ctx.fillStyle = this.createGradient(ctx);
    ctx.fill(path);
  }
}

export class Triangle extends Polygon {
  constructor(x: number, y: number, size: number, color: string) {
    super(x, y, size, color, 3);
  }
}

export class Rectangle extends Polygon {
  constructor(x: number, y: number, size: number, color: string) {
    super(x, y, size, color, 4);
  }
}

export class Circle extends Shape {
  draw(ctx: CanvasRenderingContext2D) {
    const radius = this.size / 2;

    const path = new Path2D();
    path.moveTo(0, 0);
    path.arc(this.x, this.y, radius, 0, 2 * Math.PI);

    ctx.fillStyle = this.createGradient(ctx);
    ctx.fill(path);
  }
}
