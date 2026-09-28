const homeScreen = document.querySelector("#homeScreen");
const gameScreen = document.querySelector("#gameScreen");

const playButton = document.querySelector("#playButton");
const restartButton = document.querySelector("#restartButton");
const menuButton = document.querySelector("#menuButton");

const gameArea = document.querySelector("#gameArea");
const player = document.querySelector("#player");

const scoreText = document.querySelector("#score");
const bestScoreText = document.querySelector("#bestScore");
const homeBestScore = document.querySelector("#homeBestScore");
const livesText = document.querySelector("#lives");

const gameOverScreen = document.querySelector("#gameOver");
const finalScore = document.querySelector("#finalScore");

const leftButton = document.querySelector("#leftButton");
const rightButton = document.querySelector("#rightButton");


let playerX = 50;
let score = 0;
let lives = 3;
let bestScore = 0;
let gameRunning = false;

let meteorTimer;
let coinTimer;
let scoreTimer;


// ==========================
// PLAYER
// ==========================

function updatePlayer() {

    player.style.left = playerX + "%";

}


// ==========================
// MOVE PLAYER
// ==========================

function moveLeft() {

    if (!gameRunning) return;

    playerX -= 7;

    if (playerX < 5) {
        playerX = 5;
    }

    updatePlayer();
}


function moveRight() {

    if (!gameRunning) return;

    playerX += 7;

    if (playerX > 95) {
        playerX = 95;
    }

    updatePlayer();
}


// ==========================
// KEYBOARD
// ==========================

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft" || event.key === "a") {
        moveLeft();
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        moveRight();
    }

});


// ==========================
// MOBILE BUTTONS
// ==========================

leftButton.addEventListener("click", moveLeft);

rightButton.addEventListener("click", moveRight);


// ==========================
// CREATE METEOR
// ==========================

function createMeteor() {

    if (!gameRunning) return;

    const meteor = document.createElement("div");

    meteor.className = "meteor";

    meteor.textContent = "☄️";

    meteor.style.left =
        Math.random() * 90 + 5 + "%";

    meteor.style.top = "-50px";

    gameArea.appendChild(meteor);


    let meteorY = -50;


    const movement = setInterval(function() {

        if (!gameRunning) {

            clearInterval(movement);

            meteor.remove();

            return;
        }


        meteorY += 5;

        meteor.style.top = meteorY + "px";


        // Collision

        const playerRect =
            player.getBoundingClientRect();

        const meteorRect =
            meteor.getBoundingClientRect();


        if (
            playerRect.left < meteorRect.right &&
            playerRect.right > meteorRect.left &&
            playerRect.top < meteorRect.bottom &&
            playerRect.bottom > meteorRect.top
        ) {

            clearInterval(movement);

            meteor.remove();

            loseLife();

            return;
        }


        // Remove meteor

        if (meteorY > gameArea.clientHeight) {

            clearInterval(movement);

            meteor.remove();
        }

    }, 30);

}


// ==========================
// CREATE COIN
// ==========================

function createCoin() {

    if (!gameRunning) return;

    const coin = document.createElement("div");

    coin.className = "coin";

    coin.textContent = "🪙";

    coin.style.left =
        Math.random() * 85 + 5 + "%";

    coin.style.top =
        Math.random() * 60 + 10 + "%";


    gameArea.appendChild(coin);


    const check = setInterval(function() {

        if (!gameRunning) {

            clearInterval(check);

            coin.remove();

            return;
        }


        const playerRect =
            player.getBoundingClientRect();

        const coinRect =
            coin.getBoundingClientRect();


        if (
            playerRect.left < coinRect.right &&
            playerRect.right > coinRect.left &&
            playerRect.top < coinRect.bottom &&
            playerRect.bottom > coinRect.top
        ) {

            score += 10;

            scoreText.textContent =
                score.toString().padStart(4, "0");


            coin.remove();

            clearInterval(check);
        }

    }, 30);


    setTimeout(function() {

        if (coin.parentElement) {

            coin.remove();

            clearInterval(check);
        }

    }, 3000);

}


// ==========================
// LOSE LIFE
// ==========================

function loseLife() {

    lives--;

    livesText.textContent = lives;


    player.style.opacity = "0.3";


    setTimeout(function() {

        player.style.opacity = "1";

    }, 300);


    if (lives <= 0) {

        endGame();
    }

}


// ==========================
// SCORE
// ==========================

function increaseScore() {

    if (!gameRunning) return;

    score++;

    scoreText.textContent =
        score.toString().padStart(4, "0");
}


// ==========================
// START GAME
// ==========================

function startGame() {

    homeScreen.style.display = "none";

    gameScreen.style.display = "block";

    gameOverScreen.style.display = "none";


    score = 0;

    lives = 3;

    playerX = 50;


    scoreText.textContent = "0000";

    livesText.textContent = "3";


    gameRunning = true;


    updatePlayer();


    document
        .querySelectorAll(".meteor, .coin")
        .forEach(item => item.remove());


    clearInterval(meteorTimer);
    clearInterval(coinTimer);
    clearInterval(scoreTimer);


    meteorTimer =
        setInterval(createMeteor, 700);


    coinTimer =
        setInterval(createCoin, 1400);


    scoreTimer =
        setInterval(increaseScore, 1000);

}


// ==========================
// GAME OVER
// ==========================

function endGame() {

    gameRunning = false;


    clearInterval(meteorTimer);

    clearInterval(coinTimer);

    clearInterval(scoreTimer);


    if (score > bestScore) {

        bestScore = score;

        bestScoreText.textContent =
            bestScore.toString().padStart(4, "0");

        homeBestScore.textContent =
            bestScore.toString().padStart(4, "0");
    }


    finalScore.textContent =
        score.toString().padStart(4, "0");


    gameOverScreen.style.display = "flex";
}


// ==========================
// BUTTONS
// ==========================

playButton.addEventListener(
    "click",
    startGame
);


restartButton.addEventListener(
    "click",
    startGame
);


menuButton.addEventListener(
    "click",
    function() {

        gameRunning = false;

        clearInterval(meteorTimer);
        clearInterval(coinTimer);
        clearInterval(scoreTimer);


        gameScreen.style.display = "none";

        gameOverScreen.style.display = "none";

        homeScreen.style.display = "flex";


        homeBestScore.textContent =
            bestScore.toString().padStart(4, "0");


        document
            .querySelectorAll(".meteor, .coin")
            .forEach(item => item.remove());

    }
);
