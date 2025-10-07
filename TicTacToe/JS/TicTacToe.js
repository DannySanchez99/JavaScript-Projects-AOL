let activePlayer = 'X';
let selectedSquares = [];

/* 🎯 Colocar X o O en el tablero */
function placeXOrO(squareNumber) {
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        let select = document.getElementById(squareNumber);

        if (activePlayer === 'X') {
            select.style.backgroundImage = 'url("images/X.png")';
        } else {
            select.style.backgroundImage = 'url("images/O.png")';
        }

        selectedSquares.push(squareNumber + activePlayer);
        checkWinConditions();

        // Cambia el turno
        activePlayer = (activePlayer === 'X') ? 'O' : 'X';
        audio("Media/place.mp3");

        // Turno automático de la computadora
        if (activePlayer === 'O') {
            disableClick();
            setTimeout(() => computersTurn(), 1000);
        }
        return true;
    }
    return false;
}

/* 🤖 Turno automático de la computadora */
function computersTurn() {
    let success = false;
    let pickASquare;

    while (!success) {
        pickASquare = String(Math.floor(Math.random() * 9));
        if (placeXOrO(pickASquare)) {
            success = true;
        }
    }
}

/* 🏆 Verificar condiciones de victoria o empate */
function checkWinConditions() {
    // X gana
    if (arrayIncludes('0X', '1X', '2X')) drawWinLine(50, 100, 558, 100);
    else if (arrayIncludes('3X', '4X', '5X')) drawWinLine(50, 304, 558, 304);
    else if (arrayIncludes('6X', '7X', '8X')) drawWinLine(50, 508, 558, 508);
    else if (arrayIncludes('0X', '3X', '6X')) drawWinLine(100, 50, 100, 558);
    else if (arrayIncludes('1X', '4X', '7X')) drawWinLine(304, 50, 304, 558);
    else if (arrayIncludes('2X', '5X', '8X')) drawWinLine(508, 50, 508, 558);
    else if (arrayIncludes('6X', '4X', '2X')) drawWinLine(100, 508, 510, 90);
    else if (arrayIncludes('0X', '4X', '8X')) drawWinLine(100, 100, 520, 520);
    // O gana
    else if (arrayIncludes('0O', '1O', '2O')) drawWinLine(50, 100, 558, 100);
    else if (arrayIncludes('3O', '4O', '5O')) drawWinLine(50, 304, 558, 304);
    else if (arrayIncludes('6O', '7O', '8O')) drawWinLine(50, 508, 558, 508);
    else if (arrayIncludes('0O', '3O', '6O')) drawWinLine(100, 50, 100, 558);
    else if (arrayIncludes('1O', '4O', '7O')) drawWinLine(304, 50, 304, 558);
    else if (arrayIncludes('2O', '5O', '8O')) drawWinLine(508, 50, 508, 558);
    else if (arrayIncludes('6O', '4O', '2O')) drawWinLine(100, 508, 510, 90);
    else if (arrayIncludes('0O', '4O', '8O')) drawWinLine(100, 100, 520, 520);
    // Empate
    else if (selectedSquares.length >= 9) {
        audio("Media/tie.mp3");
        setTimeout(resetGame, 500);
    }
}

/* 🧩 Verifica si tres jugadas coinciden */
function arrayIncludes(squareA, squareB, squareC) {
    return (
        selectedSquares.includes(squareA) &&
        selectedSquares.includes(squareB) &&
        selectedSquares.includes(squareC)
    );
}

/* 🔄 Reinicia el juego */
function resetGame() {
    for (let i = 0; i < 9; i++) {
        const square = document.getElementById(String(i));
        square.style.backgroundImage = '';
    }
    selectedSquares = [];
    activePlayer = 'X';
}

/* 🔊 Reproducir audio */
function audio(audioURL) {
    const sound = new Audio(audioURL);
    sound.play();
}

/* 🎨 Variables globales del canvas */
let c, x1, y1, x2, y2, x, y;

/* 🧠 Dibuja línea ganadora animada */
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById('win-lines');
    c = canvas.getContext('2d');
    x1 = coordX1;
    y1 = coordY1;
    x2 = coordX2;
    y2 = coordY2;
    x = x1;
    y = y1;

    disableClick();
    audio("Media/WinGame.mp3");
    animateLineDrawing();
    setTimeout(() => { clear(); resetGame(); }, 1000);
}

/* 🌀 Animar la línea de victoria */
function animateLineDrawing() {
    const animationLoop = requestAnimationFrame(animateLineDrawing);
    c.clearRect(0, 0, 608, 608);
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x, y);
    c.lineWidth = 10;
    c.strokeStyle = 'rgba(70,255,33,.8)';
    c.stroke();

    if (x1 <= x2 && y1 <= y2) {
        if (x < x2) x += 10;
        if (y < y2) y += 10;
        if (x >= x2 && y >= y2) cancelAnimationFrame(animationLoop);
    } else if (x1 <= x2 && y1 >= y2) {
        if (x < x2) x += 10;
        if (y > y2) y -= 10;
        if (x >= x2 && y <= y2) cancelAnimationFrame(animationLoop);
    }
}

/* 🧽 Limpia el canvas */
function clear() {
    const animationLoop = requestAnimationFrame(clear);
    c.clearRect(0, 0, 608, 608);
    cancelAnimationFrame(animationLoop);
}

/* ⛔ Bloquea clicks temporalmente */
function disableClick() {
    document.body.style.pointerEvents = 'none';
    setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
    }, 1000);
}
