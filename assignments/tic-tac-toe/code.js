const min = Math.min(width, height);

const boardSize = min;

const leftX = width / 2 - boardSize / 2;
const rightX = width / 2 + boardSize / 2;
const topY = height / 2 - boardSize / 2;
const bottomY = height / 2 + boardSize / 2;

const drawBoard = (borders) => {
  const start = borders ? 0 : 1;
  const end = borders ? 3 : 2;

  for (let i = start; i <= end; i++) {
    const verticalX = leftX + boardSize * (i / 3);
    const horizontalY = topY + boardSize * (i / 3);
    drawLine(verticalX, topY, verticalX, bottomY, 'grey', 2);
    drawLine(leftX, horizontalY, rightX, horizontalY, 'gray', 2);
  }
};

const gameWin = (winner) => {
  if (winner.winType == 'h') {
    return drawLine(width / 2 - height / 2, height / 6 + height * (winner.winLoc / 3), width / 2 + height / 2, height / 6 + height * (winner.winLoc / 3), 'grey', 8)
  } else if (winner.winType == 'v') {
    return drawLine(width / 2 - height / 3 + height * (winner.winLoc / 3), height, width / 2 - height / 3 + height * (winner.winLoc / 3), 0, 'gray', 8)
  } else if (winner.winType == 'd') {
    return drawLine(width / 2 - height / (winner.winLoc == 1 ? -2 : 2), 0, width / 2 + height / (winner.winLoc == 0 ? 2 : -2), height, 'gray', 8)
  }
};

const winSearch = (player) => {
  let winner = {};
  for (let c = 0; c <= 2; c++) {
    if ((coordArray[c][0] == player) && (coordArray[c][1] == player) && (coordArray[c][2] == player)) winner = { winner: player, winType: 'h', winLoc: c };
    if ((coordArray[0][c] == player) && (coordArray[1][c] == player) && (coordArray[2][c] == player)) winner = { winner: player, winType: 'v', winLoc: c };
  }
  if ((coordArray[0][0] == player) && (coordArray[1][1] == player) && (coordArray[2][2] == player)) winner = { winner: player, winType: 'd', winLoc: 0 };
  if ((coordArray[2][0] == player) && (coordArray[1][1] == player) && (coordArray[0][2] == player)) winner = { winner: player, winType: 'd', winLoc: 1 };
  gameWin(winner)
  return winner.winner
};

registerOnclick((x, y) => {

  const yPos = Math.floor((y - topY) / (boardSize / 3));
  const xPos = Math.floor((x - leftX) / (boardSize / 3));

  if (xPos < 0 || xPos > 2) {
    drawText(xPos > 2 ? '⇦' : '⇨', x - height / 12, y + height / 12, 'black', height / 3)
  } else {
    if (coordArray[yPos][xPos] == '' && winSearch(player) == undefined) {
      coordArray[yPos][xPos] = player
      drawText(player, leftX - min * 0.1 + min / 6 + (min * xPos / 3), min * 0.1 + min / 6 + min * yPos / 3, 'black', min * 0.3)
      console.log(coordArray, 'recent: ', xPos, yPos, 'winner: ', winSearch(player))
      player = player === player1 ? player2 : player1
      turns++
      if (turns == 9 && winSearch(player) == undefined) drawText('◯', leftX, 8 / 9 * height, 'grey', height);
    }
  }
});

const player1 = 'X' //will go first
const player2 = 'O'

const coordArray = [
  [[''], [''], ['']],
  [[''], [''], ['']],
  [[''], [''], ['']],
];

let turns = 0;
let player = player1;

drawBoard(false);
