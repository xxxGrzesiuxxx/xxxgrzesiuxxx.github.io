const gameSummary = {
    numbers: null,
    wins: null,
    losses: null,
    draws: null
}
const game = {
    playerHand: null,
    aiHand: null
}
const hands = document.querySelectorAll(".select img");

let score = null;

function chooseHand() {
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px yellow';
    game.playerHand = this.dataset.option;
}

function chooseAiHand() {
    let choose = Math.floor(Math.random() * (4 - 1) + 1);
    switch (choose) {
        case 1:
            game.aiHand = "kamień";
            console.log("kamien");
            break;
        case 2:
            game.aiHand = "papier";
            console.log("papier");
            break;
        case 3:
            game.aiHand = "nożyczki";
            console.log("nozyczki");
            break;
    }
}

function chooseWinner(player, ai) {
    if (player === ai) {
        score = "remis";
    } else if (player === "nożyczki" & ai === "papier" || player === "papier" & ai === "kamień" || player === "kamień" & ai === "nożyczki") {
        score = "wygrana";
    } else {
        score = "przegrana";
    }
}

function endGame() {
    game.aiHand = null;
    game.playerHand = null;
    hands.forEach(hand => hand.style.boxShadow = '');
}

function updateStats() {
    gameSummary.numbers++;
    document.querySelector(".numbers span").textContent = gameSummary.numbers;
    if (score === "wygrana") {
        gameSummary.wins++;
        document.querySelector(".wins span").textContent = gameSummary.wins;
        document.querySelector(`[data-summary="who-win"]`).textContent = "Wygrałeś!";
    }
    if (score === "przegrana") {
        gameSummary.losses++;
        document.querySelector(".losses span").textContent = gameSummary.losses;
        document.querySelector(`[data-summary="who-win"]`).textContent = "Przegrałeś!";
    }
    if (score === "remis") {
        gameSummary.draws++;
        document.querySelector(".draws span").textContent = gameSummary.draws;
        document.querySelector(`[data-summary="who-win"]`).textContent = "Remis!";
    }
    document.querySelector(`[data-summary="ai-choice"]`).textContent = game.aiHand;
    document.querySelector(`[data-summary="your-choice"]`).textContent = game.playerHand;
}

function startGame() {
    if (!game.playerHand) {
        return alert("Wybierz dłoń!");
    }
    chooseAiHand();
    chooseWinner(game.playerHand, game.aiHand);
    updateStats();
    endGame();
}

document.querySelector(".start").addEventListener("click", startGame);
hands.forEach(hand => hand.addEventListener("click", chooseHand));