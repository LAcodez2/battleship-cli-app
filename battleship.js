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

function createBoard(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ type: "empty", hit: false }))
  );
}

function placeShips(board, ships) {
  const directions = ["horizontal", "vertical"];
  
  ships.forEach(({ type, size }) => {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * board.length);
      const col = Math.floor(Math.random() * board.length);
      const direction = directions[Math.floor(Math.random() * directions.length)];

      if (canPlaceShip(board, row, col, size, direction)) {
        for (let i = 0; i < size; i++) {
          if (direction === "horizontal") {
            board[row][col + i] = { type, id: type, hit: false };
          } else {
            board[row + i][col] = { type, id: type, hit: false };
          }
        }
        placed = true;
      }
    }
  });
}

function canPlaceShip(board, row, col, size, direction) {
  if (direction === "horizontal" && col + size > board.length) return false;
  if (direction === "vertical" && row + size > board.length) return false;
  
  for (let i = 0; i < size; i++) {
    if (direction === "horizontal" && board[row][col + i].type !== "empty") return false;
    if (direction === "vertical" && board[row + i][col].type !== "empty") return false;
  }
  return true;
}

function printBoard(board, debug = false) {
  console.log("Current Board:");
  const displayBoard = board.map(row =>
    row.map(cell => {
      if (debug || cell.hit) {
        if (cell.type === "small") return "🟠";
        if (cell.type === "large") return "🔵";
        if (cell.type === "empty" && cell.hit) return "❗";
      }
      return "-";
    })
  );
  console.table(displayBoard);
}

function playGame() {
  const size = parseInt(boardSize, 10);
  if (![4, 5, 6].includes(size)) return;

  const board = createBoard(size);
  const ships = size === 4 ? [{ type: "large", size: 3 }, { type: "small", size: 2 }] :
               size === 5 ? [{ type: "large", size: 3 }, { type: "small", size: 2 }, { type: "small", size: 2 }] :
               [{ type: "large", size: 3 }, { type: "large", size: 3 }, { type: "small", size: 2 }, { type: "small", size: 2 }];

  placeShips(board, ships);

  let remainingShips = ships.reduce((sum, ship) => sum + ship.size, 0);
  
  while (remainingShips > 0) {
    console.clear();
    printBoard(board, false);
    const guess = readlineSync.question("Enter a guess (e.g., A1, B2): ");
    const row = guess.charCodeAt(0) - 65;
    const col = parseInt(guess[1], 10) - 1;
    
    if (row < 0 || row >= size || col < 0 || col >= size) {
      console.log("Invalid guess. Try again.");
      continue;
    }

    if (!board[row][col].hit) {
      board[row][col].hit = true;
      if (board[row][col].type !== "empty") {
        console.log("Hit!");
        remainingShips--;
      } else {
        console.log("Miss!");
      }
    } else {
      console.log("Already guessed this spot.");
    }
  }
  console.log("You sank all the ships!");
}

playGame();


