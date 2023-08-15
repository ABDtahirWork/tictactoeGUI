let grid = []
const inputContainer = document.querySelector('.input__container')
const startButton = document.querySelector('.container__button')
const sizeInput = document.querySelector('.container__input')
const gridBox = document.querySelector('.grid__game')
const gridContainer = document.querySelector('.grid')
const playerTurn = document.querySelector('.main__playerTurn')
const winningContainer = document.querySelector('.winning-message')
const winningText = document.querySelector('.winning-message-text')
const restartButton = document.querySelector('.restart__button')
const players = ['X', 'O']
let currentPlayer = 0
let sizeGrid = 0
let totalTurns = 0

startButton.addEventListener('click', () => {
  sizeGrid = parseInt(sizeInput.value)
  sizeInput.value = ''
  if (!isNaN(sizeGrid)) {
    startGame(sizeGrid)
  }
})

const startGame = (sizeGrid) => {
  inputContainer.style.display = 'none'
  gridBox.style.display = 'block'
  playerTurn.textContent = players[currentPlayer]
  createGrid(sizeGrid)
}

const restartGame = () => {
  currentPlayer = 0
  sizeGrid = 0
  grid = []
  gridContainer.innerHTML = ''
  gridBox.style.display = 'none'
  winningContainer.style.display = 'none'
  inputContainer.style.display = 'flex'
}

restartButton.addEventListener('click', restartGame)

const createGrid = (sizeGrid) => {
  const fontSize = 8 * (3 / sizeGrid)
  const fontLetter = 5 * (3 / sizeGrid)

  for (let row = 0; row < sizeGrid; row++) {
    const rowArray = []
    for (let col = 0; col < sizeGrid; col++) {
      const box = document.createElement('div')
      box.classList.add('grid__box')
      box.dataset.row = row
      box.dataset.col = col
      box.textContent = ' '
      box.style.fontSize = `${fontLetter}rem`
      rowArray.push(box)
      gridContainer.appendChild(box)
      onClickBox(box)
    }
    grid.push(rowArray)
  }
  gridContainer.style.gridTemplateColumns = `repeat(${sizeGrid} , minmax(0, ${fontSize}rem))`
  gridContainer.style.gridTemplateRows = `repeat(${sizeGrid} , minmax(0, ${fontSize}rem))`
}

const onClickBox = (box) => {
  box.addEventListener('click', () => {
    if (box.textContent === ' ') {
      const row = Number(box.dataset.row)
      const col = Number(box.dataset.col)
      grid[row][col] = players[currentPlayer]
      box.textContent = players[currentPlayer]
      checkWinner(row, col)
      currentPlayer = (currentPlayer + 1) % 2
      playerTurn.textContent = players[currentPlayer]
    }
  })
}

const checkWinner = (row, col) => {
  totalTurns += 1
  //check for row
  let win = false
  if (grid[row].every((element) => element === players[currentPlayer]) === true)
    win = true
  if (win === true) displayWinner()

  //check for column
  for (let i = 0; i < sizeGrid; i++) {
    if (grid[i][col] === players[currentPlayer]) {
      win = true
    } else {
      win = false
      break
    }
  }
  if (win === true) displayWinner()

  //check for diagonals
  win = checkDiagonal(row, col)
  if (win === true) displayWinner()

  if (totalTurns === sizeGrid * sizeGrid) {
    displayDraw()
  }
}

const checkDiagonal = (row, col) => {
  let win = false
  //check top-right to bottom-left
  if (sizeGrid - 1 === row + col) {
    for (let i = sizeGrid - 1, j = 0; j < sizeGrid; i--, j++) {
      if (grid[i][j] === players[currentPlayer]) {
        win = true
      } else {
        win = false
        break
      }
    }
  }
  if (win === true) return true

  //check top-left to bottom-right
  if (row === col) {
    for (let i = 0, j = 0; i < sizeGrid; i++, j++) {
      if (grid[i][j] === players[currentPlayer]) {
        win = true
      } else {
        win = false
        break
      }
    }
  }
  return win
}

const displayWinner = () => {
  winningContainer.style.display = 'flex'
  winningText.textContent = `${players[currentPlayer]} WINS!`
}

const displayDraw = () => {
  winningContainer.style.display = 'flex'
  winningText.textContent = `DRAW!`
}
