//MENU

const intialzeGameButton = document.getElementById("initialize-button");
const initializeMenu = document.getElementById("menu");
const game = document.getElementById("game");
const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");

const Player = (sign, active) =>{
  this.sign = sign;
  this.active = active;

  const getSign=()=>{
    return sign;
  }

  const getActive=()=>{
    return active;
  }

  const changeActive = () => {
    console.log("changeActive" + active);
    this.active = !active;
    if(this.active){
      document.getElementById("turn").innerHTML =  sign;
    }
  }

  return {sign, active, getSign, changeActive, getActive};
}

const gameControl = (() => {

  const playerX = Player("x", true);
  const playerO = Player("o", false);
  let turn = 0;

  const getTurn = () => {
    return turn;
  }

  const passTurn = () =>{
    turn++;

    if (turn%2 == 0) {
      document.getElementById("turn").innerHTML =  playerX.getSign();
      playerX.active = true;
    }
    else {
      document.getElementById("turn").innerHTML =  playerO.getSign();
      playerO.active = true;
    } 
  }

  return{passTurn, getTurn}
});

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
    e.target.classList.add("x-chose");
    newGame.passTurn();
  });
});
