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
}

//Handling display of numbers that were
//inserted
function handleNumber(val) {
    if(buffer === '0') {
        buffer = val
    } else {
        buffer += val
    }
    rerender()
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
            
    }
}

//Writing the buffer amount out
//on the screen
function rerender() {
    screen.innerText = buffer
}
})();