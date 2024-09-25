//Variables 
const cells = document.querySelectorAll(".cell")
const statusText = document.querySelector("#statusText")
const restartBtn = document.querySelector("#restartBtn")

const winConditions = [
    
    //Matrix 
    [0, 1 ,2],
    [3, 4, 5],
    [6, 7 ,8],
    
    //Columns 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    //Diagonals
    [0, 4, 8],
    [2, 4, 6],

]
    // Any status

let options = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = "X"
let running = false

initializeGame()

//Functions

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked)) //remember that "forEach" does not return a new array
    restartBtn.addEventListener("click", restartGame)
    statusText.innerHTML = `${currentPlayer} Turn 's`
    running = true
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex") //retorna o cellIndex do elemento

    //Se onde eu clicar, não estiver vázio, ou o running for "false"
    if(options[cellIndex] != "" || !running){ 
        return
    }
    updateCell(this, cellIndex)
    checkWinner()
}

// Atualizando espaços reservados
function updateCell(cell, index){
    options[index] = currentPlayer
    cell.textContent = currentPlayer
}

function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X"
    statusText.textContent = `${currentPlayer} 's turn`
}

function checkWinner(){
    let roundWon = false 

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i]
        const cellA = options[condition[0]] //0
        const cellB = options[condition[1]] //1
        const cellC = options[condition[2]] //2

        if(cellA === "" || cellB === "" || cellC === ""){
            continue
        }

        if(cellA === cellB && cellB === cellC){
            roundWon = true
            break
        }
    }

    if(roundWon){
        statusText.innerHTML = `${currentPlayer} wins`
        running = false
    } else if(!options.includes("")){
        statusText.innerHTML = `Draw`
        running = false
    } else{
        changePlayer()
    }

}  

function restartGame(){
    currentPlayer = "X"
    options = ["", "", "", "", "", "", "", "", ""]
    statusText.innerHTML = `${currentPlayer}'s turn`
    cells.forEach(cell => cell.textContent = "")
    running = true
}



