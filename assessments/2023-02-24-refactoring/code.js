const drawPicture = (horizon, base, size) => {
  drawBackground(horizon);
  drawSnowman(width * 0.25, size, base, [3, 4, 5], 0.25);
  drawSnowman(width * 0.75, size, base - 50, [3, 4, 5], 0.25);
};

const drawBackground = (horizon) => {
  drawFilledRect(0, 0, width, horizon, '#ddeeff');
  drawFilledRect(0, horizon, width, height, 'white');
  drawLine(0, horizon, width, horizon, '#bbb');
};

const drawSnowman = (x, size, base, proportions, eyeSpacing) => {
  const top = base - size;
  const total = sum(proportions);
  const rs = proportions.map((p) => scaledRadius(size, p, total));
  const ys = rs.reduce((ys, r, i) => [ ...ys, top + r + 2 * sum(rs.slice(0, i))], []);
  drawHead(x, ys[0], rs[0], eyeSpacing);
  drawTorso(x, ys[1], rs[1]);
  drawButt(x, ys[2], rs[2]);
};

const sum = (ns) => ns.reduce((tot, n) => tot + n, 0);

const scaledRadius = (size, p, total) => size / 2 * (p / total);

const drawHead = (x, y, radius, eyeSpacing) => {
  drawSnowball(x, y, radius);
  drawEyes(x, y, radius, eyeSpacing);
  drawNose(x, y, radius);
  drawMouth(x, y,radius);
  drawHat(x, y, y - radius * 0.9, radius * 2.25, radius * 1.55);
};

const drawSnowball = (x, y, r) => {
  drawCircle(x, y, r + 2, 'black', 3);
  drawFilledCircle(x, y, r, 'white', 3);
};

const drawCoal = (x, y) => {
  drawFilledCircle(x, y, 4, 'black');
};

const drawEyes = (x, y, r, spacing) => {
  const eyeSpacing = r * spacing;
  drawCoal(x - eyeSpacing, y - eyeSpacing);
  drawCoal(x +eyeSpacing, y - eyeSpacing);
};

const drawNose = (x, headY, headRadius) => {
  const noseLength = headRadius * 0.8;
  drawFilledTriangle(x, headY, x + noseLength, headY + noseLength * 0.2, x, headY + noseLength * 0.3, 'orange');
};

const drawMouth = (x, headY, headRadius) => {
  for (let i = 0; i < 5; i++) {
    const dy = -2 * (2.1 ** Math.abs(i - 2));
    drawCoal(x - (i - 2.3) * headRadius * 0.21, headY + headRadius * 0.65 + dy);
  }
};

const drawHat = (x, y, brimTop, brimWidth, hatHeight) => {
  const brimHeight = brimWidth * 0.08;
  const hatWidth = brimWidth * 0.7;
  drawFilledRect(x - brimWidth / 2, brimTop, brimWidth, brimHeight, 'black');
  drawFilledRect(x - hatWidth / 2, brimTop - hatHeight, hatWidth, hatHeight, 'black');
};

const drawTorso = (x, y, radius) => {
  drawSnowball(x, y, radius);
  drawArms(x, y, radius);
  drawButtons(x, y, radius);
};

const drawArms = (x, y, r) => {
  drawArm(x, y, r, 1);
  drawArm(x, y, r, -1);
};

const drawArm = (x, y, r, s) => {
  let x1 = x + r * 0.6 * s;
  let x2 = x + r * 2.35 * s;
  drawLine(x1, y - r * 0.25, x2, y - r * 0.85, 'black', 3);
};

const drawButtons = (x, y, r) => {
  for (let i = -1; i < 2; i++) {
    drawCoal(x, y + i * r * 0.5);
  }
};

const drawButt = (x, y, r) => {
  drawSnowball(x, y, r);
};

drawPicture(height * 0.7, height * 0.9, height * 0.7);
