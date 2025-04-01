// build a battleship game
// greet the user

const readlineSync = require("readline-sync");

function greeting() {
  console.log("Welcome to Battleship 🚢");
  console.log("Choose a Board Size");
}

greeting();

const boardSize = readlineSync.question("Enter 4, 5, or 6 for board size:");

if (boardSize === "4" || boardSize === "5" || boardSize === "6") {
  console.log(`You have selected a ${boardSize}x${boardSize} board`);
} else {
  console.log("Invalid selection. Please enter 4, 5, or 6.");
}

function printBoard(board, debug) {
  const boardSize = board.length;
  let renderedBoard = '';

  for (let row = 0; row < boardSize; row++){
    let rowOutPut = ''
    for (let col = 0; col < boardSize; col++){
      const cell = board[row][col];
    }
  }
}
