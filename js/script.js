// ---------- Regles du jeu -------------------------------
// On commence avec un tas d'allumettes (par exemple, 20).
// Chaque joueur (vous et l'ordinateur) enlève tour à tour 1, 2 ou 3 allumettes du tas.
// Celui qui prend la dernière allumette perd.

class Nim {
  constructor(
    matchesCount,
    messageDisplay,
    userSelectionButton,
    userSelectionInput
  ) {
    this.matchesCountDisplay = matchesCount; // DOM element
    this.matchesCount = Number(matchesCount.textContent); // Number
    this.messageDisplay = messageDisplay;
    this.userSelectionButton = userSelectionButton;
    this.userSelectionInput = userSelectionInput; // DOM element
    this.userSelection = Number(userSelectionInput.value); // Number
    this.gameStatusArray = ["notstarted", "started", "ended"];
    this.players = ["human", "computer"];
    this.currentPlayer = null;
    this.currentGameStatus = this.gameStatusArray[0]; // notstarted -> started -> ended
    this.humanSelection = null;
  }

  displayOnUI(location, text) {
    location.textContent = String(text);
  }

  wait() {
    setTimeout(() => {
      console.log("... ... ...");
    }, 3000);
  }

  humanMoveAfterSubmission() {
    console.log("humanMoveAfterSubmission triggered");
    const matchesCountSelection = this.userSelectionInput.value;
    this.matchesCount = this.matchesCount - Number(matchesCountSelection);
    this.displayOnUI(this.matchesCountDisplay, String(this.matchesCount));
    this.userSelectionButton.classList.toggle("hidden");
    this.checkTurnResult();
  }

  humanPlays() {
    console.log("humanPlays triggered");
    console.log("Human's turn to play");
    const message = "Your turn to play!";
    this.displayOnUI(messageDisplay, message);
    this.userSelectionButton.classList.toggle("hidden");
  }

  computerPlays() {
    console.log("Computer's turn to play");
    const message = "Give the computer a few seconds to think...";
    this.displayOnUI(messageDisplay, message);
    setTimeout(() => {
      console.log("... ... ...");
      const matchesCountSelection = this.getRandomMatchesCountSelection();
      console.log(`Computer has selected ${matchesCountSelection} matches`);
      this.matchesCount = this.matchesCount - matchesCountSelection;
      this.displayOnUI(this.matchesCountDisplay, String(this.matchesCount));
      this.checkTurnResult();
    }, 3000);
  }

  currentPlayerMove(player) {
    if (player === "human") this.humanPlays();
    if (player === "computer") this.computerPlays();
  }

  getRandomMatchesCountSelection(difficulty = "difficult") {
    if (this.matchesCount > 3) return Math.ceil(Math.random() * 3);
    if (this.matchesCount === 3)
      return difficulty === "easy" ? Math.ceil(Math.random() * 2) : 3;
    if (this.matchesCount === 2)
      return difficulty === "easy" ? Math.ceil(Math.random() * 2) : 2;
  }

  checkCurrentGameStatus() {
    switch (this.currentGameStatus) {
      case "notstarted":
        console.log("Game is about to start...");
        this.currentGameStatus = "started";
        console.log(this.currentGameStatus);
        this.currentPlayerMove(this.currentPlayer);
        break;
      case "started":
        console.log("Game has started");
        this.currentPlayerMove(this.currentPlayer);
        break;
      case "ended":
        console.log("Game has ended");
        break;
      default:
        console.log(`Weird, no valid status detected, please double-check!`);
    }
  }

  checkTurnResult() {
    console.log("checkTurnResult triggered");
    switch (this.matchesCount) {
      case 0:
        console.log("case 0 triggered");
        const msg1 = `${this.currentPlayer} has won!`;
        this.displayOnUI(messageDisplay, msg1);
        this.currentGameStatus = "ended";
        // Add Reset button to UI => this.reset()
        break;
      case 1:
        console.log("case 1 triggered");
        const msg2 = `${this.currentPlayer} has lost!`;
        this.displayOnUI(messageDisplay, msg2);
        this.currentGameStatus = "ended";
        // Add Reset button to UI => this.reset()
        break;
      default:
        console.log("case default triggered");
        console.log("this.matchesCount 1: ", this.matchesCount);
        if (this.matchesCount < 0) console.log("Error with matchesCount");
        if (this.matchesCount > 1) this.nextMove();
    }
  }

  toggleCurrentPlayer() {
    console.log("toggleCurrentPlayer triggered");
    switch (this.currentPlayer) {
      case "human":
        this.currentPlayer = "computer";
        console.log(`Current player is now: ${this.currentPlayer}`);
        break;
      case "computer":
        this.currentPlayer = "human";
        break;
      default:
        this.currentPlayer = "human";
        console.log(`Setting this.currentPlayer to "human" as default`);
    }
  }

  nextMove() {
    console.log("nextMove triggered");
    console.log("Game status: ", this.currentGameStatus);
    this.toggleCurrentPlayer();
    this.checkCurrentGameStatus();
  }

  reset() {
    // logic to start new game
  }

  healthcheck() {
    console.log("so far so good...");
  }
}

// ---------- Capturing DOM elements -------------------------------
const matchesCount = document.querySelector("#matches-count");
const messageDisplay = document.querySelector("#message-display");
const userSelectionButton = document.querySelector("button");
const userSelectionInput = document.querySelector("#user-selection-form input");

// ---------- Initialization -------------------------------

function init() {
  const nim = new Nim(
    matchesCount,
    messageDisplay,
    userSelectionButton,
    userSelectionInput
  );

  // ---------- Event Listeners -------------------------------
  userSelectionButton.addEventListener("click", (e) => {
    e.preventDefault();
    nim.humanMoveAfterSubmission();
  });

  userSelectionInput.addEventListener("change", (e) => {
    nim.userSelection = Number(e.target.value);
    console.log(nim.userSelection);
  });

  // ---------- Starting up -------------------------------
  // nim.healthcheck();
  nim.nextMove();
}

init();
