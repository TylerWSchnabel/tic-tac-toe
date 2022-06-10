

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
        let compLev = document.getElementById('compLev');
        let computer = Player("Computer", "O", 0);
        players.push(computer);
        document.getElementById("playerDos").style.display = "none";
        gameBoardModule.displayBoard();
        gameBoardModule.displayScoreboard();
        turn.textContent = players[0].getName() + "'s turn";
        gameBoardModule.setCurrentPlayer(players[0], players[1]);
        compLev.style.display = "block";
        compOpp = true
    }
    let currentPlayer = "";
    let offPlayer = ""

    function setCurrentPlayer(player, notPlayer){
        currentPlayer = player;
        offPlayer  = notPlayer;
    }
    
    function setAI(){
        let level = document.getElementById('compAI');
        let ai;
        if (level.value === "easy"){
            ai = 0;
        } else if (level.value === "medium"){
            ai = 50;
        } else if (level.value === "hard"){
            ai = 90;
        } else if (level.value === "impossible"){
            ai = 100;
        }
        return ai;
    }
    
    
    
    
    function computerPlay() {
        let percent = Math.floor(Math.random() * 101);
        let played = false;
        let ai  = setAI();
        while (played === false){
           if (percent < ai){
                bestMove();
                played=true;
                console.log('best move');
            } else {
                let space = Math.floor(Math.random() * 9);
                if (gameBoard[space] === ""){
                    placeMarker(space);
                    played = true;
                    console.log('random');
                    }
                }
            }
    }
    
    const _switchPlayer = () => {
        let turn = document.getElementById("turn");
        if (gameBoard.includes("") === true){
            if (currentPlayer === players[1]){
                currentPlayer = players[0];
                offPlayer = players[1];
                turn.textContent = players[0].getName() + "'s turn"
            } else {
                currentPlayer = players[1];
                offPlayer = players[0];
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
                gameBoard[i] = currentPlayer.getMarker();
                _printBoard();
                _endGame();
                _switchPlayer();
                return gameBoard;
            } else {
                alert("Space taken, try again.");
            }
        }
    }
    function _printBoard(){
        for (let i =0; i<gameBoard.length; i++){
            boxes[i].textContent = gameBoard[i];
        }
        console.log(getEmptyField(gameBoard));
    }

    function _checkTie(board) {
        let winner = document.getElementById("winner");
        let winnerMessage = document.getElementById("winner-message");
        if (getEmptyField(board).length === 0) {
            winnerMessage.textContent = "Tie!"
            winner.style.display = "grid";
            gameOn = false;
        }
    }

    function _endGame (){
        let winner = document.getElementById("winner");
        let winnerMessage = document.getElementById("winner-message");
        if (_checkWin(gameBoard, currentPlayer)){
            winnerMessage.textContent = currentPlayer.getName()+ " is the Winner!";
            winner.style.display = "grid";
            currentPlayer.score = currentPlayer.score + 1;
            displayScoreboard();
            gameOn = false;
        } else {
            _checkTie(gameBoard);
        }
    }
    
    function _checkWin(board, player){
        if (board[0] == player.getMarker() && board [1] == player.getMarker() && board[2] == player.getMarker() ||
            board[0] == player.getMarker() && board [3] == player.getMarker() && board[6] == player.getMarker() ||
            board[1] == player.getMarker() && board [4] == player.getMarker() && board[7] == player.getMarker() ||
            board[2] == player.getMarker() && board [5] == player.getMarker() && board[8] == player.getMarker() ||
            board[3] == player.getMarker() && board [4] == player.getMarker() && board[5] == player.getMarker() ||
            board[6] == player.getMarker() && board [7] == player.getMarker() && board[8] == player.getMarker() ||
            board[0] == player.getMarker() && board [4] == player.getMarker() && board[8] == player.getMarker() ||
            board[2] == player.getMarker() && board [4] == player.getMarker() && board[6] == player.getMarker() ){
                return true;
            } else {
                return false;
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
        gameBoard = ["","","","","","","","",""];
        _printBoard();
        gameOn = true;
        winner.style.display = "none";
        currentPlayer = players[0];
        offPlayer = players[1];
        turn.textContent = players[0].getName() + "'s turn"
    }

    function bestMove(){
        let bestScore = -1000;
        let move;
        for (let i=0; i < gameBoard.length; i++){
            if (gameBoard[i] === ""){
                gameBoard[i] = players[1].getMarker();
                let minScore = minimax(gameBoard, 0, false);
                console.log(i + " --- " + minScore);
                gameBoard[i] = ""
               if (minScore > bestScore) {
                   bestScore = minScore;
                   move = {i};
               }
            }
        }
        placeMarker(move.i);
    }
    
    function minimax (newBoard, depth, maxing){
        let avail = getEmptyField(newBoard);
        if (_checkWin(newBoard, players[1]) === true) {
            return  10;
        } else if (_checkWin(newBoard, players[0]) === true){
            return  -10;
        } else if (avail.length === 0){
            return  0;
        }

        if (maxing) {
            let bestScore = -1000;
            for (let i= 0; i < newBoard.length; i++){
                if (newBoard[i] == ""){
                    newBoard[i] = players[1].getMarker();
                    let minScore = minimax(newBoard, depth +1, false);
                    //console.log(newBoard + "  -  " + minScore + "  -  " + depth);
                    newBoard[i] = "";
                    bestScore = Math.max(minScore - depth, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = 1000;
            for (let i= 0; i<newBoard.length; i++){
                if (newBoard[i] == ""){
                    newBoard[i] = players[0].getMarker();
                    let minScore = minimax(newBoard, depth +1, true);
                    //console.log( "mining  " + i + "  --  " + minScore);
                    newBoard[i] = "";
                    bestScore = Math.min(minScore + depth, bestScore);
                }
            }
            return bestScore;
        }

    }
    
    return {displayBoard, samePlayers, displayScoreboard, playComputer, currentPlayer, setCurrentPlayer,getEmptyField, gameBoard, getEmptyField, minimax};
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
        gameBoardModule.setCurrentPlayer(players[0], players[1]);
        console.log("poop");
    }
}