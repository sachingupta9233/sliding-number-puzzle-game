const grid = document.getElementById("grid");
const message = document.getElementById("message");

let tiles = [...Array(8).keys()].map(n => n + 1);
tiles.push(""); // empty tile
shuffle(tiles);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function render() {
  grid.innerHTML = "";
  tiles.forEach((val, i) => {
    const div = document.createElement("div");
    div.classList.add("tile");
    if (val === "") {
      div.classList.add("empty");
    } else {
      div.textContent = val;
      div.addEventListener("click", () => tryMove(i));
    }
    grid.appendChild(div);
  });

  if (checkWin()) {
    message.classList.remove("hidden");
  }
}

function tryMove(index) {
  const emptyIndex = tiles.indexOf("");
  const validMoves = [index - 1, index + 1, index - 3, index + 3];
  if (validMoves.includes(emptyIndex) && isAdjacent(index, emptyIndex)) {
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    render();
  }
}

function isAdjacent(i1, i2) {
  const row1 = Math.floor(i1 / 3), col1 = i1 % 3;
  const row2 = Math.floor(i2 / 3), col2 = i2 % 3;
  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}

function checkWin() {
  const winState = ["1", "2", "3", "4", "5", "6", "7", "8", ""];
  return tiles.join("") === winState.join("");
}

render();