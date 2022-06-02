const Player = (name, marker, score) => {
    const getName = () =>  name;
    const getMarker = () =>  marker;
    
    let getPlayerInfo = () => {
        console.log("Player "+number +"'s name is "+ name+" and their marker is "+marker+ ".");
    };
    return {getMarker, getName, score};
}

let players = [];

const createPlayerOne = () => {
    let playerOne = document.getElementById("player1").value;
    if (playerOne != "") {
        const first = Player(playerOne, "X", 0);
        players.push(first);
        document.getElementById("playerUno").style.display = "none";
        document.getElementById("playerDos").style.display = "grid";
    } else {
        alert("Must input a name.");
    }
};

const createPlayerTwo = () => {
    let playerTwo = document.getElementById("player2").value;
    if (playerTwo != "") {
        let second = Player(playerTwo, "O", 0);
        players.push(second);
        document.getElementById("playerDos").style.display = "none";
        gameBoardModule.displayBoard();
        gameBoardModule.displayScoreboard();
        turn.textContent = players[0].getName() + "'s turn";
    }
}

const gameBoardModule = function() {
    let gameBoard = ["","","","","","","","",""];
    let boxes = document.querySelectorAll(".square");
    printBoard();
    for (let i=0; i<boxes.length; i++) {
        boxes[i].addEventListener("click", function(){placeMarker(i);});
    }

    var compOpp = false

    const playComputer = () => {
        let computer = Player("Computer", "O", 0);
        players.push(computer);
        document.getElementById("playerDos").style.display = "none";
        gameBoardModule.displayBoard();
        gameBoardModule.displayScoreboard();
        turn.textContent = players[0].getName() + "'s turn";
        compOpp = true
    }
    
    let currentPlayer = "X";

    function comuterPlay() {
        let played = false;
        while (played === false){
            console.log("searching");
            let space = Math.floor(Math.random() * 9);
            if (gameBoard[space] === ""){
                placeMarker(space);
                played = true;
                }
            }
    }
    
    const switchPlayer = () => {
        let turn = document.getElementById("turn");
        if (gameBoard.includes("") === true){
            if (currentPlayer === players[1].getMarker()){
                currentPlayer = players[0].getMarker();
                turn.textContent = players[0].getName() + "'s turn"
            } else {
                currentPlayer = players[1].getMarker();
                turn.textContent = players[1].getName() + "'s turn"
                if (compOpp === true) {
                    comuterPlay();
                    }
                }
            }
        }
    let gameOn = true
    function placeMarker(i) {
        if (gameOn === true){
            if (gameBoard[i] === ""){
                gameBoard[i] = currentPlayer;
                printBoard();
                checkWin();
                switchPlayer();
            } else {
                alert("Space taken, try again.");
            }
        }
    }
    function printBoard(){
        for (let i =0; i<gameBoard.length; i++){
            boxes[i].textContent = gameBoard[i];
        }
    }
    function checkWin(){
        let winner = document.getElementById("winner");
        let winnerMessage = document.getElementById("winner-message");
        if (gameBoard[0] === "X" && gameBoard [1] === "X" && gameBoard[2] === "X" ||
            gameBoard[0] === "X" && gameBoard [3] === "X" && gameBoard[6] === "X" ||
            gameBoard[1] === "X" && gameBoard [4] === "X" && gameBoard[7] === "X" ||
            gameBoard[2] === "X" && gameBoard [5] === "X" && gameBoard[8] === "X" ||
            gameBoard[3] === "X" && gameBoard [4] === "X" && gameBoard[5] === "X" ||
            gameBoard[6] === "X" && gameBoard [7] === "X" && gameBoard[8] === "X" ||
            gameBoard[0] === "X" && gameBoard [4] === "X" && gameBoard[8] === "X" ||
            gameBoard[2] === "X" && gameBoard [4] === "X" && gameBoard[6] === "X" ){
                winnerMessage.textContent = players[0].getName()+ " is the Winner!";
                winner.style.display = "grid";
                players[0].score= players[0].score + 1;
                displayScoreboard();
                gameOn = false;
            } else if (
            gameBoard[0] === "O" && gameBoard [1] === "O" && gameBoard[2] === "O" ||
            gameBoard[0] === "O" && gameBoard [3] === "O" && gameBoard[6] === "O" ||
            gameBoard[1] === "O" && gameBoard [4] === "O" && gameBoard[7] === "O" ||
            gameBoard[2] === "O" && gameBoard [5] === "O" && gameBoard[8] === "O" ||
            gameBoard[3] === "O" && gameBoard [4] === "O" && gameBoard[5] === "O" ||
            gameBoard[6] === "O" && gameBoard [7] === "O" && gameBoard[8] === "O" ||
            gameBoard[0] === "O" && gameBoard [4] === "O" && gameBoard[8] === "O" ||
            gameBoard[2] === "O" && gameBoard [4] === "O" && gameBoard[6] === "O" ){
                winnerMessage.textContent = players[1].getName()+ " is the Winner!";
                winner.style.display = "grid";
                players[1].score = players[1].score + 1;
                displayScoreboard();
                gameOn = false;
            } else if (gameBoard.includes("") === false){
                winnerMessage.textContent = "Tie!"
                winner.style.display = "grid";
                gameOn = false;
            }
    }

    function displayBoard() {
        document.getElementById("boardContainer").style.display="grid";
    }
    
    function displayScoreboard(){
        document.getElementById("scoreboard").style.display = "grid";
        document.getElementById("playerOneName").textContent = players[0].getName();
        document.getElementById("oneScore").textContent = players[0].score;
        document.getElementById("playerTwoName").textContent = players[1].getName();
        document.getElementById("twoScore").textContent = players[1].score;
    }

    function samePlayers() {
        gameBoard = gameBoard = ["","","","","","","","",""];
        printBoard();
        gameOn = true;
        winner.style.display = "none";
        currentPlayer = players[0].getMarker();
        turn.textContent = players[0].getName() + "'s turn."
    }
    
    return {displayBoard, samePlayers, displayScoreboard, playComputer};
}()