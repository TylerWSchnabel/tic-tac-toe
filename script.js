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
    _printBoard();
    for (let i=0; i<boxes.length; i++) {
        boxes[i].addEventListener("click", function(){placeMarker(i);});
    }

    function getEmptyField(board){
        var empty = []
        for (let i=0; i<board.length; i++){
            if (board[i] === ""){
                empty.push(i);
            }
        }
        return empty;
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

    function computerPlay() {
        let played = false;
        while (played === false){
            let space = Math.floor(Math.random() * 9);
            if (gameBoard[space] === ""){
                placeMarker(space);
                played = true;
                }
            }
    }
    
    const _switchPlayer = () => {
        let turn = document.getElementById("turn");
        if (gameBoard.includes("") === true){
            if (currentPlayer === players[1].getMarker()){
                currentPlayer = players[0].getMarker();
                turn.textContent = players[0].getName() + "'s turn"
            } else {
                currentPlayer = players[1].getMarker();
                turn.textContent = players[1].getName() + "'s turn"
                if (compOpp === true) {
                    setTimeout(computerPlay, 250);
                    }
                }
            }
        }
    let gameOn = true
    function placeMarker(i) {
        if (gameOn === true){
            if (gameBoard[i] === ""){
                gameBoard[i] = currentPlayer;
                _printBoard();
                _checkWin(gameBoard);
                _switchPlayer();
            } else {
                alert("Space taken, try again.");
            }
        }
    }
    function _printBoard(){
        for (let i =0; i<gameBoard.length; i++){
            boxes[i].textContent = gameBoard[i];
        }
    }


    
    function _checkWin(board){
        let champ;
        let winner = document.getElementById("winner");
        let winnerMessage = document.getElementById("winner-message");
        if (board[0] === "X" && board [1] === "X" && board[2] === "X" ||
            board[0] === "X" && board [3] === "X" && board[6] === "X" ||
            board[1] === "X" && board [4] === "X" && board[7] === "X" ||
            board[2] === "X" && board [5] === "X" && board[8] === "X" ||
            board[3] === "X" && board [4] === "X" && board[5] === "X" ||
            board[6] === "X" && board [7] === "X" && board[8] === "X" ||
            board[0] === "X" && board [4] === "X" && board[8] === "X" ||
            board[2] === "X" && board [4] === "X" && board[6] === "X" ){
                winnerMessage.textContent = players[0].getName()+ " is the Winner!";
                champ = players[0];
                winner.style.display = "grid";
                players[0].score= players[0].score + 1;
                displayScoreboard();
                gameOn = false;
            } else if (
            board[0] === "O" && board[1] === "O" && board[2] === "O" ||
            board[0] === "O" && board[3] === "O" && board[6] === "O" ||
            board[1] === "O" && board[4] === "O" && board[7] === "O" ||
            board[2] === "O" && board[5] === "O" && board[8] === "O" ||
            board[3] === "O" && board[4] === "O" && board[5] === "O" ||
            board[6] === "O" && board[7] === "O" && board[8] === "O" ||
            board[0] === "O" && board[4] === "O" && board[8] === "O" ||
            board[2] === "O" && board[4] === "O" && board[6] === "O" ){
                winnerMessage.textContent = players[1].getName()+ " is the Winner!";
                champ = players[1];
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
        _printBoard();
        gameOn = true;
        winner.style.display = "none";
        currentPlayer = players[0].getMarker();
        turn.textContent = players[0].getName() + "'s turn"
    }
    
    return {displayBoard, samePlayers, displayScoreboard, playComputer};
}()