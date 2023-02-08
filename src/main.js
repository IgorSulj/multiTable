import './style.css'

const app = document.getElementById('app')

const table = multiplicationTable()

document.addEventListener('keydown', handleTableNavigation)

app.prepend(table, randomPickButton())

function multiplicationTable() {
    let table = document.createElement('div')
    table.className = 'table'

    table.append(...initialRow())

    for (let row_id = 2; row_id < 10; row_id++) {
        table.append(...createmultiplicationRows(row_id))
    }
    return table
}

function createmultiplicationRows(row_id) {
    let row = []
    row.push(numberCell(row_id))

    for (let cell_id = 2; cell_id < 10; cell_id++) {
        row.push(multiplicationCell(cell_id, row_id))
    }
    
    return row
}

function initialRow() {
    let row = []
    row.push(document.createElement('div'))
    for (let i = 2; i < 10; i++) {
        let cell = numberCell(i)
        row.push(cell)
    }
    return row
}

function numberCell(num) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.append(num.toString())
    return cell
}

function multiplicationCell(x, y) {
    const answer_str = `${x * y}`
    let cell = document.createElement('input')
    cell.type = 'text'
    cell.inputMode = 'numeric'
    cell.className = 'input-cell'
    cell.dataset.x = x
    cell.dataset.y = y
    
    const checkInput = event => {
        const val = event.target.value
        if (val == '') {
            cell.classList.remove('correct', 'incorrect')
        } else if (val == answer_str) {
            cell.classList.add('correct')
            cell.classList.remove('incorrect')
        } else {
            cell.classList.add('incorrect')
            cell.classList.remove('correct')
        }
    }

    cell.oninput = checkInput

    return cell
}

function randomPickButton() {
    let button = document.createElement('button')
    button.append('Случайное поле')

    const pickRandomCell = () => {
        const [x, y] = [0, 0].map(() => getRandomInt(2, 9))
        console.log(x, y)
        getCellbyCoords(x, y).focus()
    }

    button.addEventListener('click', pickRandomCell);

    return button
}

function getCellbyCoords(x, y) {
    return document.querySelector(`.input-cell[data-x="${x}"][data-y="${y}"]`)
}

function handleTableNavigation(event) {
    if (!document.activeElement.classList.contains('input-cell')) {
        return
    }

    let {x, y} = document.activeElement.dataset;
    x = Number(x)
    y = Number(y)
    switch (event.key) {
        case 'ArrowDown':
            if (y == 9) return
            y += 1
            break
        case 'ArrowUp':
            if (y == 2) return
            y -= 1
            break
        case 'ArrowLeft':
            if (x == 2) return
            x -= 1
            break
        case 'ArrowRight':
            if (x == 9) return
            x += 1
            break
        default:
            return
    }
    getCellbyCoords(x, y).focus()
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
