const gameBoardModule = function() {
    const gameBoard = ["","O","","","","O","","",""];
    let boxes = document.querySelectorAll(".square");
    printBoard();
    for (let i=0; i<boxes.length; i++) {
        boxes[i].addEventListener("click", function(){placeMarker(i);});
    }

    function placeMarker(i) {
        if (gameBoard[i] === ""){
            gameBoard[i] = "X";
        } else {

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
    console.log("this is working");

    function checkWin(){
        if (gameBoard[0] === "X" && gameBoard [1] === "X" && gameBoard[2] === "X" ||
            gameBoard[0] === "X" && gameBoard [3] === "X" && gameBoard[6] === "X" ||
            gameBoard[1] === "X" && gameBoard [4] === "X" && gameBoard[7] === "X" ||
            gameBoard[2] === "X" && gameBoard [5] === "X" && gameBoard[8] === "X" ||
            gameBoard[3] === "X" && gameBoard [4] === "X" && gameBoard[5] === "X" ||
            gameBoard[6] === "X" && gameBoard [7] === "X" && gameBoard[8] === "X" ||
            gameBoard[0] === "X" && gameBoard [4] === "X" && gameBoard[8] === "X" ||
            gameBoard[2] === "X" && gameBoard [4] === "X" && gameBoard[6] === "X" ){
                alert("Winner is X!");
                console.log("winner");
            };
    }
}()

let createPlayer = (name, number, marker) => {
    let getPlayerInfo = () => {
        console.log("Player "+number +"'s name is "+ name+" and their marker is "+marker+ ".")
    };
}

const playGame = function(){
    let playerCreator = function(){
        let player1 = document.getElementById("player1");
        let player2 = document.getElementById("player2");
        let firstPlayer = createPlayer(player1.value, 1, "X");
        let secondPlayer = createPlayer(player2.value, 2, "O");
    }
    return {playerCreator}
}

