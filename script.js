//MENU

const intialzeGameButton = document.getElementById("initialize-button");
const initializeMenu = document.getElementById("menu");
const game = document.getElementById("game");
const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");

const Player = (sign, active) => {
  this.sign = sign;
  this.active = active;

  const getSign = () => {
    return sign;
  };

  const getActive = () => {
    return active;
  };

  const changeActive = () => {
    console.log("changeActive" + active);
    this.active = !active;

    if (this.active) {
      document.getElementById("turn").innerHTML = sign;
    }
  };

  return { sign, active, getSign, changeActive, getActive };
};

const gameControl = () => {
  const playerX = Player("x", true);
  const playerO = Player("o", false);
  let board = ["", "", "", "","", "", "", "", ""];
  let turn = 0;

  const getTurn = () => {
    return turn;
  };

  const getPlayerX = () => {
    return playerX;
  };

  const getPlayerO = () => {
    return playerO;
  };

  const getBoard = () => {
    return board;
  };


  const passTurn = (e) => {
    if (turn % 2 == 0) {
      document.getElementById("turn").innerHTML = playerO.getSign().toUpperCase();
      //set sign on board
      board[e.id] = "x";
      //set style of square
      e.classList.add("x-chose");
      e.classList.remove("square-x");
      playerX.active = true;
    } 
    else {
      document.getElementById("turn").innerHTML = playerX.getSign().toUpperCase();
      //set sign on board
      board[e.id] = "o";
      //set style of square
      e.classList.add("o-chose");
      e.classList.remove("square-o");
      playerO.active = true;
    }

    turn++;
  };

  return { passTurn, getTurn, getPlayerO, getPlayerX, getBoard };
};

intialzeGameButton.addEventListener("click", (e) => {
  initializeMenu.classList.add("non-actived");
  game.classList.remove("non-actived");
});

function checkCheckboxes() {
  if (checkbox1.checked) {
    checkbox2.checked = false;
  }

  if (checkbox2.checked) {
    checkbox1.checked = false;
  }
}

checkbox1.addEventListener("change", () => {
  checkbox2.checked = false;
  checkbox1.checked = true;
});

checkbox2.addEventListener("change", () => {
  checkbox1.checked = false;
  checkbox2.checked = true;
});

//GAME

const board = document.getElementById("board");

const newGame = gameControl();

//Add event listener to square of board
board.querySelectorAll(".square").forEach((square) => {
  square.addEventListener("click", (e) => {
    newGame.passTurn(e.target);
    changeHover();
    checkWinner(newGame.getBoard());
  });
});

function changeHover(){

  console.log(newGame.getTurn()% 2);
  for (let i = 0; i < board.children.length; i++) {

    if(!board.children[i].className.includes("chose") && newGame.getTurn() % 2 == 1)
    {
      console.log("entraaa OO" + newGame.getTurn()% 2);
      board.children[i].classList.remove("square-x");
      board.children[i].classList.add("square-o");
    }
    else if(!board.children[i].className.includes("chose"))
    {
      console.log("entraaa XX" + newGame.getTurn()% 2);
      board.children[i].classList.remove("square-o");
      board.children[i].classList.add("square-x");
    }
    else{
      board.children[i].classList.remove("square-x");
      board.children[i].classList.remove("square-o");
    }
  
  }
}


function checkWinner(board) {
  // Define all possible winning combinations
  const winningCombos = [
    // Rows
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // Columns
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // Diagonals
    [0, 4, 8], [2, 4, 6]
  ];

  // Loop through all possible winning combinations
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    // Check if the board has the same value at all three positions in the winning combination
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      setWinnerStyle(winningCombos[i], board[a]);
      return board[a];
    }
  }
  return null;
}


function setWinnerStyle(winningCombo, winner){

   const square1 = document.getElementById(winningCombo[0]);
   const square2 = document.getElementById(winningCombo[1]);
   const square3 = document.getElementById(winningCombo[2]);

  square1.classList.add("winner");
  square1.classList.remove("square-x");
  square1.classList.remove("x-chose");
  square1.classList.remove("o-chose");

  square2.classList.add("winner");
  square2.classList.remove("square-x");
  square2.classList.remove("x-chose");
  square2.classList.remove("o-chose");

  square3.classList.add("winner");
  square3.classList.remove("square-x");
  square3.classList.remove("x-chose");
  square3.classList.remove("o-chose");

  if(winner == "x"){
    square1.classList.add("winner-x");
    square2.classList.add("winner-x");
    square3.classList.add("winner-x");
  }
  else{
    square1.classList.add("winner-o");
    square2.classList.add("winner-o");
    square3.classList.add("winner-o");
  }
}