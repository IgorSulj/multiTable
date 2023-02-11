let lastState = [...Array(64)].map(() => '')

export function buttonBlock() {
    let block = document.createElement('div')
    block.className = 'button-block'
    let subblock = document.createElement('div')
    subblock.append(randomPickButton(), clearTableButton())
    block.append(subblock)
    subblock = document.createElement('div')
    subblock.append(restoreTableButton())
    block.append(subblock)
    return block
}

function randomPickButton() {
    let button = document.createElement('button')
    button.className = 'button'
    button.append('Случайное поле')

    const pickRandomCell = () => {
        let pickCandidates = document.querySelectorAll('.input-cell:not(.correct)')
        pickArrayElement(pickCandidates).focus()
    }

    button.addEventListener('click', pickRandomCell);

    return button
}

function clearTableButton() {
    let button = document.createElement('button')
    button.className = 'button'
    button.append('Сброс')

    const clearTable = () => {
        let field = document.querySelectorAll('.input-cell')
        let isFieldEmpty = true
        for (let input of field) {
            isFieldEmpty &&= (input.value == '')
        }
        if (isFieldEmpty) return
        lastState = Array.prototype.map.call(field, input => input.value)
        field.forEach(input => {
            input.value = ''
            input.classList.remove('correct', 'incorrect')
        })

        let restoreButton = document.querySelector('.restore-button')
        restoreButton.style.display = 'block'
        document.addEventListener('input', () => {
            restoreButton.style.display = 'none'
        }, {once: true})


        console.log(lastState)
    }
    button.addEventListener('click', clearTable)
    return button
}

function restoreTableButton() {
    let button = document.createElement('button')
    button.className = 'button restore-button'
    button.append('Восстановить')

    const restoreTable = () => {
        let inputs = document.querySelectorAll('.input-cell')
        inputs.forEach((input, i) => {
            input.value = lastState[i]
            input.dispatchEvent(new Event('input'))
        })
        button.style.display = 'none'
    }

    button.addEventListener('click', restoreTable)
    return button
}

function pickArrayElement(arr) {
    let min = 0
    let max = arr.length
    let index = Math.floor(Math.random() * (max - min) + min)
    return arr[index]
}
