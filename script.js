const Player = (name, marker) => {
    const getName = () =>  name;
    const getMarker = () =>  marker;
    let getPlayerInfo = () => {
        console.log("Player "+number +"'s name is "+ name+" and their marker is "+marker+ ".");
    };
    return {getMarker, getName};
}

let players = [];

const createPlayerOne = () => {
    let playerOne = document.getElementById("player1").value;
    if (playerOne != "") {
        const first = Player(playerOne, "X");
        players.push(first);
        document.getElementById("playerUno").style.display = "none";
        document.getElementById("playerDos").style.display = "grid";
        return {first};
    } else {
        alert("Must input a name.");
    }
};

const createPlayerTwo = () => {
    let playerTwo = document.getElementById("player2").value;
    if (playerTwo != "") {
        let second = Player(playerTwo, "O");
        players.push(second);
        document.getElementById("playerDos").style.display = "none";
        gameBoardModule.displayBoard();
        return {second};
    }
}

const gameBoardModule = function() {
    const gameBoard = ["","","","","","","","",""];
    let boxes = document.querySelectorAll(".square");
    printBoard();
    for (let i=0; i<boxes.length; i++) {
        boxes[i].addEventListener("click", function(){placeMarker(i);});
    }
    
    let currentPlayer = "X";
    
    const switchPlayer = () => {
        if (currentPlayer === players[1].getMarker()){
            currentPlayer = players[0].getMarker();
        } else {
            currentPlayer = players[1].getMarker();
        }
    }
    function placeMarker(i) {
        if (gameBoard[i] === ""){
            gameBoard[i] = currentPlayer;
        } else {
            alert("Space taken, try again.");
        }
        console.log("working");
        printBoard();
        checkWin();
    }
    function printBoard(){
        for (let i =0; i<gameBoard.length; i++){
            boxes[i].textContent = gameBoard[i];
        }
    }
    function checkWin(){
        if (gameBoard[0] === "X" && gameBoard [1] === "X" && gameBoard[2] === "X" ||
            gameBoard[0] === "X" && gameBoard [3] === "X" && gameBoard[6] === "X" ||
            gameBoard[1] === "X" && gameBoard [4] === "X" && gameBoard[7] === "X" ||
            gameBoard[2] === "X" && gameBoard [5] === "X" && gameBoard[8] === "X" ||
            gameBoard[3] === "X" && gameBoard [4] === "X" && gameBoard[5] === "X" ||
            gameBoard[6] === "X" && gameBoard [7] === "X" && gameBoard[8] === "X" ||
            gameBoard[0] === "X" && gameBoard [4] === "X" && gameBoard[8] === "X" ||
            gameBoard[2] === "X" && gameBoard [4] === "X" && gameBoard[6] === "X" ){
                alert(players[0].getName() +" is the winner!");
                console.log("winner");
            } else if (
            gameBoard[0] === "O" && gameBoard [1] === "O" && gameBoard[2] === "O" ||
            gameBoard[0] === "O" && gameBoard [3] === "O" && gameBoard[6] === "O" ||
            gameBoard[1] === "O" && gameBoard [4] === "O" && gameBoard[7] === "O" ||
            gameBoard[2] === "O" && gameBoard [5] === "O" && gameBoard[8] === "O" ||
            gameBoard[3] === "O" && gameBoard [4] === "O" && gameBoard[5] === "O" ||
            gameBoard[6] === "O" && gameBoard [7] === "O" && gameBoard[8] === "O" ||
            gameBoard[0] === "O" && gameBoard [4] === "O" && gameBoard[8] === "O" ||
            gameBoard[2] === "O" && gameBoard [4] === "O" && gameBoard[6] === "O" ){
                alert(players[1].getName() +" is the winner!");
                console.log("winner");
            } else if (gameBoard.includes("") === false){
                alert("Tie!")
            } else {
                switchPlayer();
            };
    }
    function displayBoard() {
        document.getElementById("boardContainer").style.display="grid";
    };
    return {displayBoard};
}()