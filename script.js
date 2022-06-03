

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
    let currentPlayer= "";

    function setCurrentPlayer(player){
        currentPlayer = player;
    }

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
            if (currentPlayer === players[1]){
                currentPlayer = players[0];
                turn.textContent = players[0].getName() + "'s turn"
            } else {
                currentPlayer = players[1];
                turn.textContent = players[1].getName() + "'s turn"
                if (compOpp === true) {
                    setTimeout(computerPlay, 250);
                    }
                }
            }
        }
    let gameOn = true
    function placeMarker(i) {
        console.log(currentPlayer);
        if (gameOn === true){
            if (gameBoard[i] === ""){
                console.log(currentPlayer);
                gameBoard[i] = currentPlayer.getMarker();
                _printBoard();
                _checkWin(gameBoard, currentPlayer);
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


    
    function _checkWin(board, player){
        let champ;
        let winner = document.getElementById("winner");
        let winnerMessage = document.getElementById("winner-message");

        if (board[0] == player.getMarker() && board [1] == player.getMarker() && board[2] == player.getMarker() ||
            board[0] == player.getMarker() && board [3] == player.getMarker() && board[6] == player.getMarker() ||
            board[1] == player.getMarker() && board [4] == player.getMarker() && board[7] == player.getMarker() ||
            board[2] == player.getMarker() && board [5] == player.getMarker() && board[8] == player.getMarker() ||
            board[3] == player.getMarker() && board [4] == player.getMarker() && board[5] == player.getMarker() ||
            board[6] == player.getMarker() && board [7] == player.getMarker() && board[8] == player.getMarker() ||
            board[0] == player.getMarker() && board [4] == player.getMarker() && board[8] == player.getMarker() ||
            board[2] == player.getMarker() && board [4] == player.getMarker() && board[6] == player.getMarker() ){
                winnerMessage.textContent = currentPlayer.getName()+ " is the Winner!";
                champ = player;
                winner.style.display = "grid";
                player.score= player.score + 1;
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
        currentPlayer = players[0];
        turn.textContent = players[0].getName() + "'s turn"
    }
    console.log("pee");
    
    return {displayBoard, samePlayers, displayScoreboard, playComputer, currentPlayer, setCurrentPlayer,getEmptyField, gameBoard};
}()


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
    gameBoardModule.setCurrentPlayer(players[0]);
    ;
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
        console.log("poop");
    }
}