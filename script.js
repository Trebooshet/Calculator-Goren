let a = '';
let b = '';
let operationSign = '';
let finish = false;
let opFinish = false;

const display = document.getElementById('display');
const button = document.querySelectorAll('button');
const submitButton = document.getElementById("submit_btn");
const clearButton = document.getElementById("clear_btn");
const charmander = document.getElementById('charmander');
const squirtle = document.getElementById('squirtle');
const pokemon1 = document.getElementById('pokemon1');
const pokemon2 = document.getElementById('pokemon2');



// чтобы при нажатии на 'Enter' и пробел не происходило нажатие кнопки с фокусом, а выполнялась calculation()
document.addEventListener('keydown', function (event) {

    if (event.key === 'Enter') {
        event.preventDefault(); 
        return; 
    }
    else if (event.key === ' ') {
        event.preventDefault(); 
        return; 
    }
})


// анимация картинок на кнопках 'C' и '='
clearButton.addEventListener('mousedown', function() {
    charmander.classList.remove('hidden');
    pokemon1.classList.add('hidden')
});

clearButton.addEventListener('mouseup', function() {
    charmander.classList.add('hidden');
    pokemon1.classList.remove('hidden')
});

submitButton.addEventListener('mousedown', function() {
    squirtle.classList.remove('hidden');
    pokemon2.classList.add('hidden')
});
submitButton.addEventListener('mouseup', function() {
    squirtle.classList.add('hidden');
    pokemon2.classList.remove('hidden')
});

// очищение дисплея
function clearDisplay() { 
    a = '0';
    b = '';
    operationSign = '';
    display.innerText = a;
    console.log('clearDisplay');
}

// ввод '.'
function addDot(x) {

    if (finish) {
        a = '0' + x;
        display.innerText = a;
        finish = false;
    }

    else if (opFinish && b === '') {
        b = '0' + x;
        display.innerText = b
        opFinish = false;
    }

    else if (display.innerText === a && operationSign === '') {

        if (a === '') {a = '0' + x}

        else if (a.includes('.')) { a === a}
        
        else if (a.startsWith('0') && a.length === 1) {a += x}

        else {a += x}

        display.innerText = a
    }

    else if (display.innerText === a && operationSign !== '') {

        if (b === '') {b = '0' + x}

        else if (b.includes('.')) { b === b}
        
        else if (b.startsWith('0') && b.length === 1) {b += x}

        else {b += x}

        display.innerText = b
    }

    else {

        if (b.includes('.')) { b === b}
        
        else {
        b += x;
        display.innerText = b}
    }
}


// ввод цифры
function addNumber(x) {

    if (finish) {
        a = String(x);
        finish = false;
        display.innerText = a;
    }

    else if (operationSign === '' || a === '') {
        a += x;
        a.startsWith('0') && a.length > 1 && !a.includes('.') ? a = a.substring(1) : a; 
        display.innerText = a;
    }

    else {  
        b += x;
        b.startsWith('0') && b.length > 1 && !b.includes('.') ? b = b.substring(1) : b; 
        display.innerText = b;
    }
}

// выбор операции
 function chooseOperation(x) {

    if (a !== '' && b !== '' && operationSign !== '') {
        calculation();
        operationSign = x;
        opFinish = true;
    }

    else {  
        operationSign = x;  
    }

    finish = false;
 }

 // функция '='
 function calculation() {
    
    if (b === '') b = a;
    if (a !== '' && operationSign !== '') {

        switch(operationSign) {

        case '+' : 
            a = (+a) + (+b);
        break;

        case '-' :
            a = a - b;
        break;

        case 'x' :
            a = a * b;
        break;

        case '/' :
            if (b === '0') {
               clearDisplay();
               display.style.background = 'linear-gradient(  #FF8973,  #FF8973)';
               setTimeout(function() {
                display.style.background = 'linear-gradient(90deg, bisque 75%, #fbe27d)';
            }, 500);
               a = '0';

            }
            else {
                a = a / b;
            }
        break;    
    }
    
    b = '';
    operationSign = '';
    a = a.toFixed(9);
    display.innerText =  parseFloat(a);
    finish = true;
 }
 }

  // уменьшение шрифта на дисплее, при большом вводе
  button.forEach(button => {button.addEventListener('click', function() {
    if (display.textContent.length > 16) {
        display.style.fontSize = "38px";
    }    
    else if (display.textContent.length > 15) {
        display.style.fontSize = "39px";
    }
    else if (display.textContent.length > 14) {
        display.style.fontSize = "42px";
    }
    else if (display.textContent.length > 13) {
        display.style.fontSize = "45px";
    }
    else if (display.textContent.length > 12) {
        display.style.fontSize = "48px";
    }
     else {
        display.style.fontSize = "50px";}
});
});

// ввод с клавиатуры
document.addEventListener('keydown', function(event) {
    const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const operation = ['+', '-', 'x', '/'];

    if (number.includes(event.key)) {
        addNumber(event.key)
    }
    else if (operation.includes(event.key)) {
        chooseOperation(event.key)
    }
    else if (event.key === '.') {
        addDot(event.key)
    }
    else if (event.key === '=' || event.key === 'Enter' || event.key === ' ') {
        calculation()
    }
    else if (event.key === 'c') {
        clearDisplay()
    }    
    else {return}
})