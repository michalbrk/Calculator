(function() {
//Current amount
let runningTotal = 0
//Value of the current input
let buffer = '0'
//Keeping track of the last pressed operator
let prevOperator = null;
const screen = document.querySelector('.screen')

document
    .querySelector('.calc-btns')
    .addEventListener('click', (e) => {
        btnClick(e.target.innerText)
    })

//Checking if chosen value is a number or not
function btnClick(val) {
    if(isNaN(parseInt(val))) {
        handleSymbol(val)
    } else {
        handleNumber(val)
    }
    rerender()
}

//Handling display of numbers that were
//inserted
function handleNumber(val) {
    if(buffer === '0') {
        buffer = val
    } else {
        buffer += val
    }
}

function handleSymbol(val) {
    switch(val) {
        //Resetting everything in screen
        case 'C':
            buffer = '0'
            runningTotal = 0
            prevOperator = null
            break
        case '=':
            if(prevOperator === null) {
                return
            }
            //Commit the previous operation
            flushOper(parseInt(buffer))
            prevOperator = null
            buffer = '' + runningTotal
            runningTotal = 0
            break
        case 'Bsp':
            if(buffer.length === 1) {
                buffer = '0'
            } else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break
        default:
            handleMath(val)
            break
    }
}

function handleMath(val) {
    const intBuffer = parseInt(buffer)
    if(runningTotal === 0) {
        runningTotal = intBuffer
    } else {
        flushOper(intBuffer)
    }
    prevOperator = val
    buffer = '0'
}

function flushOper(intBuffer) {
    if(prevOperator === '+') {
        runningTotal += intBuffer
    } else if(prevOperator === '-') {
        runningTotal -= intBuffer
    } else if(prevOperator === '*') {
        runningTotal *= intBuffer
    } else {
        runningTotal /= intBuffer
    }
}

//Writing the buffer amount out
//on the screen
function rerender() {
    screen.innerText = buffer
}
})();