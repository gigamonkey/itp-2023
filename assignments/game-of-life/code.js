const SIZE = 4;
const P = 0.2;
let RATE = 0;

const BLINKER = `###`;

const GLIDER = `
#..
.##
##.
`;

const PULSAR = `
..OOO...OOO..
.............
O....O.O....O
O....O.O....O
O....O.O....O
..OOO...OOO..
.............
..OOO...OOO..
O....O.O....O
O....O.O....O
O....O.O....O
.............
..OOO...OOO..
`;

const GOSPER_GG = `
........................#...........
......................#.#...........
............##......##............##
...........#...#....##............##
##........#.....#...##..............
##........#...#.##....#.#...........
..........#.....#.......#...........
...........#...#....................
............##......................
`;

const columns = Math.floor(width / SIZE);
const rows = Math.floor(height / SIZE);
const xoffset = (width - columns * SIZE) / 2;
const yoffset = (height - rows * SIZE) / 2;

const render = (grid) => {
  drawFilledRect(0, 0, width, height, 'black');
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c]) {
        fillCell(r, c);
      }
    }
  }
};

const fillCell = (r, c) => {
  drawFilledRect(xoffset + c * SIZE, yoffset + r * SIZE, SIZE, SIZE, 'rgb(0, 255, 0)');
};

const nextGeneration = (grid) => {
  const next = newGrid();
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      next[r][c] = isAlive(grid, r, c);
    }
  }
  return next;
};

const isAlive = (grid, r, c) => {
  const n = livingNeighbors(grid, r, c);
  return n === 3 || grid[r][c] && n == 2;
};

const livingNeighbors = (grid, r, c) => {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (!(dx === 0 && dy === 0)) {
        const nr = r + dx;
        const nc = c + dy;
        if (inBounds(nr, grid) && inBounds(nc, grid[nr]) && grid[nr][nc]) {
          count++
        }
      }
    }
  }
  return count;
};

const inBounds = (index, array) => 0 <= index && index < array.length;

const newGrid = () => {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < columns; c++) {
      row.push(false);
    }
    grid.push(row);
  }
  return grid;
};

const addPattern = (grid, top, left, pattern) => {
  const p = pattern.trim().split('\n');
  for (let r = 0; r < p.length; r++) {
    for (let c = 0; c < p[r].length; c++) {
      grid[top + r][left + c] = p[r][c] !== '.';
    }
  }
}

let next = now();
let grid = newGrid();

const clearGrid = () => {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      grid[r][c] = false;
    }
  }
};

const randomize = (p) => {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      grid[r][c] = Math.random() < p;
    }
  }
};

const glider = (r, c) => {
  addPattern(grid, r, c, GLIDER);
};

const gun = (r, c) => {
  addPattern(grid, r, c, GOSPER_GG);
};

const blinker = (r, c) => {
  addPattern(grid, r, c, BLINKER);
}

const pulsar = (r, c) => {
  addPattern(grid, r, c, PULSAR);
};

// Try foo(12, 42) with SIZE = 4
const foo = (r, c) => {
  pulsar(5, columns - 22);
  pulsar(Math.floor(rows/2), Math.floor(columns/2));
  gun(r, c);
};

const makePulsar = () => {
  glider(10, 30);
  glider(0, 25);
};

const makePulsar2 = () => {
  addPattern(Math.floor(rows/2), Math.floor(columns/2), '##\n##');
}

const drawFrame = (t) => {
  if (t > next) {
    render(grid);
    grid = nextGeneration(grid);
    next += RATE;
  }
};

animate(drawFrame);