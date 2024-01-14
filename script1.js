const cards = document.querySelectorAll(".card");
const player1ScoreElement = document.getElementById("player1Score");
const player2ScoreElement = document.getElementById("player2Score");
const currentPlayerElement = document.getElementById("currentPlayer");

let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let disableDeck = false;
let flippedCards = [];

function flipCard({ target: clickedCard }) {
    if (!disableDeck && !clickedCard.classList.contains("flip") && flippedCards.length < 2) {
        clickedCard.classList.add("flip");
        flippedCards.push(clickedCard);
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    disableDeck = true;
    const [card1, card2] = flippedCards;
    const cardOneImg = card1.querySelector(".back-view img").src;
    const cardTwoImg = card2.querySelector(".back-view img").src;

    if (cardOneImg === cardTwoImg) {
        handleMatch();
    } else {
        setTimeout(() => {
            card1.classList.remove("flip");
            card2.classList.remove("flip");
            flippedCards = [];
            switchPlayer();
        }, 1000);
    }
}

function handleMatch() {
    if (currentPlayer === 1) {
        player1Score++;
        player1ScoreElement.textContent = `Player 1 Score: ${player1Score}`;
    } else {
        player2Score++;
        player2ScoreElement.textContent = `Player 2 Score: ${player2Score}`;
    }

    flippedCards = [];
    disableDeck = false;
    checkWin();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    currentPlayerElement.textContent = `Player ${currentPlayer}'s Turn`;
    disableDeck = false;
}

function checkWin() {
    if (player1Score + player2Score === cards.length / 2) {
        if (player1Score > player2Score) {
            alert("Player 1 wins!");
        } else if (player2Score > player1Score) {
            alert("Player 2 wins!");
        } else {
            alert("It's a tie!");
        }
    }
}

function shuffleCard() {
    player1Score = player2Score = 0;
    currentPlayer = 1;
    currentPlayerElement.textContent = `Player ${currentPlayer}'s Turn`;
    player1ScoreElement.textContent = "Player 1 Score: 0";
    player2ScoreElement.textContent = "Player 2 Score: 0";
    flippedCards = [];
    disableDeck = false;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
    });
}

shuffleCard();

cards.forEach((card) => {
    card.addEventListener("click", flipCard);
});
function resetGame() {
    // Add the logic to reset the game, shuffle cards, reset scores, etc.
    // For example:
    shuffleCard();
    document.getElementById("player1Score").textContent = "Player 1 Score: 0";
    document.getElementById("player2Score").textContent = "Player 2 Score: 0";
    document.getElementById("currentPlayer").textContent = "Player 1's Turn";
  }
  
