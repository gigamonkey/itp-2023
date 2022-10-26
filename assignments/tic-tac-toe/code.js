// This is a bit of a new thing. registerOnclick is a function provided by the
// framework. But the argument we're passing to it is *another* function. Notice
// how the argument here looks like what we normally put on the righthand side
// of the equals sign in our normal `const foo = ...` function definition. This
// is called an anonymous function. We'll discuss this in more detail in a few
// weeks but for now you can just adapt this code.

let move = 0;
let gameOver = false;

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
const cols = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
const diags = [[0, 4, 8], [6, 4, 2]];

const lines = [...rows, ...cols, ...diags];

const boardSize = Math.min(width, height) - 50;
const boxSize = boardSize / 3;
const boardX = (width - boardSize) / 2
const boardY = (height - boardSize) / 2;
const fontSize = boardSize / 3;

const clickToCell = (x, y) => {
  if (!gameOver) {
    const column = Math.floor(3 * (x - boardX) / boardSize);
    const row = Math.floor(3 * (y - boardY) / boardSize);
    if (0 <= row && row < 3 && 0 <= column && column < 3) {
      if (board[row][column] === '') {
        const m = move % 2 === 0 ? 'X' : 'O';
        board[row][column] = m;
        move++;
        drawText(m, textX(column), textY(row), 'black', fontSize);
        const w = findWinner(board);
        if (w !== null) {
          console.log('Winner! ' + w);
          gameOver = true;
          winnerLine(w);
        }
      }
    }
  }
};

const row = (n) => Math.floor(n / 3);
const col = (n) => n % 3;

const findWinner = (board) => {
  for (let i = 0; i < lines.length; i++) {
    if (winner(extractLine(lines[i], board))) return lines[i];
  }
  return null;
};

const winnerLine = (line) => {
  const start = line[0];
  const end = line[line.length - 1];
  let startX = centerX(col(start));
  let startY = centerY(row(start));
  let endX = centerX(col(end));
  let endY = centerY(row(end));

  startY -= 0.25 * (endY - startY);
  startX -= 0.25 * (endX - startX);
  endY += 0.25 * (endY - startY);
  endX += 0.25 * (endX - startX);

  drawLine(startX, startY, endX, endY, 'red', 16);
};

const extend = (x, y, m, d) => {
  const dx = Math.sqrt((d ** 2 - m ** 2) / 2);
  const dy = dx * m;
  return [dx, dy];
}

const extractLine = (spec, board) => {
  let line = [];
  for (let i = 0; i < spec.length; i++) {
    const r = Math.floor(spec[i] / 3);
    const c = spec[i] % 3;
    line.push(board[r][c]);
  }
  return line;
};

const winner = (line) => {
  if (line[0] === '') return false;

  for (let i = 1; i < line.length; i++) {
    if (line[i] !== line[0]) {
      return false;
    }
  }
  return true;
};



const centerX = (c) => boardX + boxSize / 2 + (c * boxSize);
const centerY = (r) => boardY + boxSize / 2 + (r * boxSize);

const textX = (c) => centerX(c) - boxSize / 3;
const textY = (r) => centerY(r) + boxSize / 3;

const drawBoard = (size) => {
  for (let i = 0; i < 2; i++) {
    const x = boardX + (boardSize / 3) * (i + 1);
    drawLine(x, boardY, x, boardY + boardSize, 'black', 3);
  }
  for (let i = 0; i < 2; i++) {
    const y = boardY + (boardSize / 3) * (i + 1);
    drawLine(boardX, y, boardX + boardSize, y, 'black', 3);
  }
};

registerOnclick(clickToCell);

drawBoard();