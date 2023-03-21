//MENU

const intialzeGameButton = document.getElementById("initialize-button");
const initializeMenu = document.getElementById("menu");
const game = document.getElementById("game");
const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");

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

