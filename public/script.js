let currentPlayer = 'player1'; // Seguimos rastreando al jugador actual

let player1Position = { x: 0, y: 0 };
let player2Position = { x: 9, y: 9 };
let obstacles = [];

// Función para renderizar el tablero de juego
function renderBoard(gameState) {
  if (gameState) {
    // Validamos que el objeto gameState tenga jugadores antes de intentar acceder a ellos
    if (gameState.players && gameState.players.player1 && gameState.players.player2) {
      player1Position = gameState.players.player1;
      player2Position = gameState.players.player2;
      obstacles = gameState.obstacles || []; // Si no hay obstáculos, inicializamos como un array vacío
    } else {
      console.error('Error: El estado del juego no tiene jugadores válidos');
      return; // Salimos de la función si no hay jugadores válidos
    }
  }

  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = ''; // Limpiamos el tablero para volver a renderizarlo

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');

      // Añadimos jugadores al tablero
      if (x === player1Position.x && y === player1Position.y) {
        cell.classList.add('player1');
      } else if (x === player2Position.x && y === player2Position.y) {
        cell.classList.add('player2');
      }

      // Añadimos las bases de los jugadores
      if (x === 0 && y === 0) {
        cell.classList.add('base');
      }
      if (x === 9 && y === 9) {
        cell.classList.add('base');
      }

      // Añadir obstáculos
      if (obstacles.some(obstacle => obstacle.x === x && obstacle.y === y)) {
        cell.classList.add('obstacle'); // Aplicamos una clase específica para el obstáculo
      }

      gameBoard.appendChild(cell); // Añadimos la celda al tablero
    }
  }
}

// Función para actualizar el estado del juego
function updateStatus(message) {
  const statusDiv = document.getElementById('status');
  statusDiv.innerText = message;
}

// Función para mover al jugador
function movePlayer(direction) {
  const directions = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  const move = directions[direction];

  let newX, newY;

  if (currentPlayer === 'player1') {
    newX = player1Position.x + move.x;
    newY = player1Position.y + move.y;
  } else {
    newX = player2Position.x + move.x;
    newY = player2Position.y + move.y;
  }

  fetch('/game/move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player: currentPlayer, x: newX, y: newY })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      updateStatus(data.error);
    } else {
      renderBoard(data.gameState); // Actualizar el tablero con el nuevo estado

      if (data.message) {
        updateStatus(data.message); // Mostrar mensaje de victoria si alguien gana
      } else {
        currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
        updateStatus(`It's ${currentPlayer}'s turn`);
      }
    }
  });
}

// Función para resetear el juego
function resetGame() {
  fetch('/game/reset', { method: 'POST', cache: 'no-store' })
    .then(res => res.json())
    .then(gameState => {
      if (gameState.players && gameState.players.player1 && gameState.players.player2) {
        renderBoard(gameState); // Re-renderizamos el tablero después del reset
        updateStatus("Game reset. It's player1's turn");
        currentPlayer = 'player1'; // Reiniciamos al jugador 1
      } else {
        console.error('Error: No se pudieron cargar los jugadores después del reset.');
      }
    })
    .catch(err => {
      console.error('Error al resetear el juego:', err);
    });
}

// Renderizado inicial del tablero
renderBoard();