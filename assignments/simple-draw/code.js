/*
 * Interpolate between two colors by interpolating the red, 
 * green, and blue components individually.
 */
const lerp = (a, b, amount) => {
  let r = 0;
  for (let i = 0; i < 3; i++) {
    const ac = a >> (i * 8) & 0xff;
    const bc = b >> (i * 8) & 0xff;
    r |= interpolate(ac, bc, amount) << (i * 8);
  };
  return r;
};

/*
 * Linear interpolation between two values.
 */
const interpolate = (a, b, amount) => a + amount * (b - a);

/*
 * Convert a numeric value to an hex color string.
 */
const rgb = (a) => `#${a.toString(16).padStart(6, '0')}`;

/*
 * Fill the drawing area with a gradient.
 */
const gradient = (clr0, clr1) => {
  for (let x = 0; x < width; x++) {
    drawFilledRect(x, 0, 1, height, rgb(lerp(clr0, clr1, x / width)));
  }
};

gradient(0xff0000, 0x0000ff);

drawFilledRect(20, 20, width - 40, height - 40, 'rgba(255, 0, 45, 0.5)');
drawFilledRect(50, 50, width - 45, height - 40, 'rgba(255, 0, 255, 0.25)');