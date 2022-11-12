const gameBoard = (() => {
  let state = ["", "", "", "", "", "", "", "", ""];
  const board = () => {
    document.getElementById("board").style.display = "grid";
    const boxes = document.querySelectorAll("#box");
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].innerHTML = state[i];
      boxes[i].setAttribute("id", i);
    }
  };

  return {
    board,
    state,
  };
})();
const displayController = (() => {
  const startPage = () => {
    const startBtn = document.querySelector("#startBtn");
    startBtn.addEventListener("click", () => {
      document.querySelector("#startPage").style.display = "none";
      // gameBoard.board();
      document.querySelector("#markers").style.display = "grid";
    });
  };
  return {
    startPage,
  };
})();
// player factory functions
// TODO: Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker.
const Player = (marker) => {
  let playerOne = {
    marker: marker,
  };
  const markers = () => {
    const x = document.querySelector("#xBtn");
    const o = document.querySelector("#oBtn");
    x.addEventListener("click", () => {
      playerOne.marker = "x";
      gameBoard.board();
      document.querySelector("#markers").style.display = "none";
    });
    o.addEventListener("click", () => {
      playerOne.marker = "o";
      gameBoard.board();
      document.querySelector("#markers").style.display = "none";
    });
  };
  const boxes = document.querySelectorAll("#box");
  let box = Array.from(boxes);
  //TODO: tie marker to array and display array value on box
  const move = () => {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].addEventListener("click", () => {
        gameBoard.state[i] = playerOne.marker;
        boxes[i].innerHTML = playerOne.marker;
        boxes[i].style.pointerEvents = "none";
        // console.log("test");
        isWinner();
        turn();
      });
    }
  };
  const turn = () => {
    if (playerOne.marker === "x") {
      playerOne.marker = "o";
    } else {
      playerOne.marker = "x";
    }
  };
  return {
    move,
    playerOne,
    markers,
  };
};
const wasim = Player();
wasim.markers();
wasim.move();
const isWinner = () => {
  const winners = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [0, 4, 8],
  ];
  return winners.find(function (winner) {
    if (
      gameBoard.state[winner[0]] === wasim.playerOne.marker &&
      gameBoard.state[winner[1]] === wasim.playerOne.marker &&
      gameBoard.state[winner[2]] === wasim.playerOne.marker
    ) {
      alert("win");
    }
    // check for draw
    if (
      gameBoard.state[0] !== "" &&
      gameBoard.state[1] !== "" &&
      gameBoard.state[2] !== "" &&
      gameBoard.state[3] !== "" &&
      gameBoard.state[4] !== "" &&
      gameBoard.state[5] !== "" &&
      gameBoard.state[6] !== "" &&
      gameBoard.state[7] !== "" &&
      gameBoard.state[8] !== ""
    ) {
      alert("draw");
    }
  });
};
