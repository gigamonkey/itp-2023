const CELLSIZE = 4;
const ROWS = Math.floor(height / CELLSIZE)
const COLS = Math.floor(width / CELLSIZE)

const emptyGrid = (rows, cols) => Array(rows).fill().map(() => Array(cols).fill(false));

const originalCells = (rows, cols) => {
  const cells = emptyGrid(rows, cols);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (Math.random() > (1 - .23)) {
        cells[y][x] = true
      }
    }
  }
  return cells;
};

const drawCells = (cells) => {
  for (let r = 0; r < cells.length; r++) {
    for (let c = 0; c < cells[0].length; c++) {
      const color = cells[r][c] ? 'green' : 'black';
      drawFilledRect(c * CELLSIZE, r * CELLSIZE, CELLSIZE, CELLSIZE, color);
    }
  }
};

const nextCells = (cells) => {
  const next = emptyGrid(cells.length, cells[0].length)
  for (let i = 0; i < next.length; i++) {
    for (let j = 0; j < next[0].length; j++) {
      let currentlyAlive = cells[i][j]
      let locations = getLocationsForCell(i, j)
      let livingNeighborCount = countLivingNeighbors(locations, i, j)

      if (currentlyAlive) {
        next[i][j] = !(livingNeighborCount <= 1 || livingNeighborCount >= 4);
      } else {
        next[i][j] = livingNeighborCount === 3;
      }
    }
  }
  return next;
}

const getLocationsForCell = (row, column) => {
  let degrees = Array(8).fill().map((_, i) => i * 45);
  if (row === 0) {
    degrees = degrees.filter(d => rowOffset(d) >= 0);
  } else if (row === ROWS - 1) {
    degrees = degrees.filter(d => rowOffset(d) <= 0);
  }
  if (column === 0) {
    degrees = degrees.filter(d => colOffset(d) >= 0);
  } else if (column === COLS - 1) {
    degrees = degrees.filter(d => colOffset(d) <= 0);
  }
  return degrees;
};

const offset = (n) => Math.sign(Math.round(n * 10));

const rowOffset = (d) => offset(Math.sin(d * Math.PI / 180));

const colOffset = (d) => offset(Math.cos(d * Math.PI / 180));

const countLivingNeighbors = (degrees, i, j) => {
  let count = 0
  degrees.forEach((d) => {
    if (current[i + rowOffset(d)][j + colOffset(d)]) {
      count++;
    }
  });
  return count;
};

const go = () => {
  drawCells(current);
  current = nextCells(current);
  setTimeout(go, 100);
};

let current = originalCells(ROWS, COLS);
go();