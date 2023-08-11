const grid = []
const inputContainer = document.querySelector('.input__container')
const startButton = document.querySelector('.container__button')
const sizeInput = document.querySelector('.container__input')
const gridBox = document.querySelector('.grid__game')
const gridContainer = document.querySelector('.grid')
const players = ['X', 'O']
let currentPlayer = 0
const html = document.querySelector('html')

startButton.addEventListener('click', () => {
  const size = parseInt(sizeInput.value)
  if (!isNaN(size)) {
    startGame(size)
  }
})

const startGame = (sizeGrid) => {
  console.log(sizeGrid)
  inputContainer.style.display = 'none'
  gridBox.style.display = 'block'
  createGrid(sizeGrid)
}

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
  gridContainer.style.gridTemplateColumns = `repeat(${sizeGrid} , ${fontSize}rem)`
  gridContainer.style.gridTemplateRows = `repeat(${sizeGrid} , ${fontSize}rem)`
}

const onClickBox = (box) => {
  box.addEventListener('click', () => {
    if (box.textContent === ' ') {
      const row = Number(box.dataset.row)
      const col = Number(box.dataset.col)
      grid[row][col] = players[currentPlayer]
      box.textContent = players[currentPlayer]
      currentPlayer = (currentPlayer + 1) % 2
    }
  })
}
