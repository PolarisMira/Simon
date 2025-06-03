let randomColor = [];
let userSelection = [];

let currentLevel = 0;
let currentUserColorChoice = 0;

let difficulty = 150;

$(document).keydown(function () {
  if (currentLevel === 0) {
    generateRandomColor();
  }
});

$(`.btn`).click(function () {
  pressed(this);

  userSelection.push($(this).attr("id"));

  console.log(`User selection: ${userSelection}`);

  if (
    userSelection[currentUserColorChoice] !==
    randomColor[currentUserColorChoice]
  ) {
    playAudio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
      resetGame();
    }, 200); // 200ms for visible effect
    return;
  }

  currentUserColorChoice++;

  if (currentUserColorChoice === randomColor.length) {
    userSelection = [];
    currentUserColorChoice = 0;
    generateRandomColor();
  }
});

function generateRandomColor() {
  currentLevel++;

  $("#level-title").text(`Level ${currentLevel}`);

  const randomNumber = Math.floor(Math.random() * 4) + 1;

  const color = numberToColor(randomNumber);

  setTimeout(() => {
    playAudio(`sounds/${color}.mp3`);
    $(`#${color}`).fadeOut(difficulty).fadeIn(difficulty);
  }, 500);

  randomColor.push(color);

  console.log(`choosen color : ${randomColor}`);
}

function numberToColor(number) {
  switch (number) {
    case 1:
      return "green";
    case 2:
      return "red";
    case 3:
      return "yellow";
    case 4:
      return "blue";
  }
}

function pressed(button) {
  playAudio(`sounds/${$(button).attr("id")}.mp3`);
  if (button) {
    $(button).addClass("pressed");
    setTimeout(() => {
      $(button).removeClass("pressed");
    }, 100);
  }
}

function resetGame() {
  randomColor = [];
  userSelection = [];
  currentLevel = 0;
  currentUserColorChoice = 0;

  $("#level-title").text(`Game Over, Press Any Key to Restart`);
}

function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}
