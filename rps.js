const textArea = document.querySelector('#textArea')
const controls = document.querySelector('#controls')
const selections = document.querySelectorAll('.selection');
let playerName = 'PLAYER'
let playerScore = computerScore = 0;
const newGameButton = document.querySelector('#newgame')
const grid = document.querySelector('.grid')
const playerInput = document.querySelector('#player')
let winningState = 3;
let nameIsSet = false;

const hands = ['rock', 'paper', 'scissors']

const getComputerHand = () => hands[Math.floor(3*Math.random())]

const getWinner = (playerSelection, computerSelection) => {
    const isWonByPlayer = () => 
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')

    if (playerSelection === computerSelection) {
        return ['Tie', 0]
    }
    if (isWonByPlayer()) {
        return [`${playerName} won`, 1]
        // return `You (${playerSelection}) won against the Computer (${computerSelection})`
    } else {
        // return `The Computer (${computerSelection}) won against you (${playerSelection})`
        return ['THE COMPUTER won', -1]
    }
}

newGameButton.addEventListener('click', startGame)

function startGame() {
    initSelections()
    toggleControlsPanel()
    this.style.display = 'none'
    // if (!nameIsSet) {
    //     askName()
    // }
    // askRounds()
    newRound()
}

// function askName() {
//     grid.style.display = 'none'
//     playerInput.style.display = 'block'
// }

// function askRounds() {
//     grid.style.display = 'none'
// }

function newRound() {
    initSelections()
    changeText(`What will\r\n${playerName} do?`)
    showSelections()
    toggleControlsPanel()
}

function acceptHand() {
    toggleControlsPanel()
    playerHand = this.dataset.hand
    let computerHand = getComputerHand()
    let resultOfGame = getWinner(playerHand, computerHand)
    displayHands(resultOfGame, [playerHand, computerHand])
    // this.classList.toggle('noshadow')
}

function displayHands(resultOfGame, [playerHand, computerHand]) {
    changeText(`${playerName} played ${playerHand}!`);
    let a = setTimeout(function(){
        changeText(`THE COMPUTER played ${computerHand}!`)
        setTimeout(function(){
            switch(resultOfGame[1]) {
                case 1:
                    playerScore++
                    break
                case -1:
                    computerScore++
                    break
                default:
                    break
            }
            changeText(`${resultOfGame[0]} ${playerScore} ${computerScore}`)
            if (playerScore == winningState || computerScore == winningState) {
                setTimeout(endGame, 1500)
            } else {
                setTimeout(newRound, 1500)
            }
        }, 1500);
    }, 1500);
}

function endGame() {
    let winner = (playerScore == winningState) ? playerName : 'THE COMPUTER';
    changeText(`${winner} won!`);
    [playerScore, computerScore] = [0, 0];
    toggleControlsPanel();
    hideSelections();
    newGameButton.style.display = 'block';
}

function initSelections() {
    selections.forEach(but => but.addEventListener('mouseover', toggleArrow))
    selections.forEach(but => but.addEventListener('click', acceptHand, {once: true}))
}

function showSelections() {
    selections.forEach(but => but.style.display = 'block')
}

function hideSelections() {
    selections.forEach(but => but.style.display = 'none')
}

function toggleControlsPanel() {
    if (controls.style.left === '100%') {
        controls.style.left = '50%';
        // controls.style.display = 'flex';
    } else {
        // controls.style.display = 'none';
        controls.style.left = '100%';
    }
}

function toggleArrow() {
    selections.forEach(sel => sel.classList.remove('arrow'))
    this.classList.toggle('arrow')
}

function returnOrig(e) {
    // this.classList.toggle('noshadow')
}

function changeText(newText) {
    textArea.textContent = newText
}


