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

  const passTurn = (e) => {
    if (turn % 2 == 0) {
      document.getElementById("turn").innerHTML = playerO.getSign();
      e.classList.add("x-chose");
      e.classList.remove("square-x");
      playerX.active = true;
    } else {
      document.getElementById("turn").innerHTML = playerX.getSign();
      e.classList.add("o-chose");
      e.classList.remove("square-o");
      playerO.active = true;
    }

    turn++;
  };

  return { passTurn, getTurn, getPlayerO, getPlayerX };
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
      board.children[i].classList.add("non-clickable-square");
      board.children[i].classList.remove("square-x");
      board.children[i].classList.remove("square-o");
    }
  
  }
}
