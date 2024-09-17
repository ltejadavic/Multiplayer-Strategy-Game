const gridSize = 10;
const obstacleCount = 5; // Cantidad de obstáculos a generar

// Initialize the grid and player positions
const initialGameState = () => ({
  grid: Array.from({ length: gridSize }, () => Array(gridSize).fill(null)),
  players: {
    player1: { x: 0, y: 0, base: { x: 0, y: 0 } }, // Player 1 en la esquina superior izquierda
    player2: { x: gridSize - 1, y: gridSize - 1, base: { x: gridSize - 1, y: gridSize - 1 } } // Player 2 en la esquina inferior derecha
  },
  turn: 'player1', // Player 1 siempre comienza
  obstacles: [] // Lista de posiciones de obstáculos
});

// Genera posiciones aleatorias para los obstáculos
const generateRandomObstacles = (gameState) => {
  const obstacles = [];
  
  while (obstacles.length < obstacleCount) {
    const randomX = Math.floor(Math.random() * gridSize);
    const randomY = Math.floor(Math.random() * gridSize);

    // Verificar que el obstáculo no esté en la base ni en la posición de los jugadores
    const isPlayerOrBasePosition = (
      (randomX === gameState.players.player1.x && randomY === gameState.players.player1.y) ||
      (randomX === gameState.players.player2.x && randomY === gameState.players.player2.y) ||
      (randomX === gameState.players.player1.base.x && randomY === gameState.players.player1.base.y) ||
      (randomX === gameState.players.player2.base.x && randomY === gameState.players.player2.base.y)
    );
    
    if (!isPlayerOrBasePosition && !obstacles.some(o => o.x === randomX && o.y === randomY)) {
      obstacles.push({ x: randomX, y: randomY });
    }
  }
  
  gameState.obstacles = obstacles;
};

// Actualiza el estado después de cada turno y genera obstáculos
const switchTurnAndGenerateObstacles = () => {
  gameState.turn = gameState.turn === 'player1' ? 'player2' : 'player1';
  generateRandomObstacles(gameState); // Generar nuevos obstáculos después de cada turno
};

let gameState = initialGameState();

// Check if move is valid considering obstacles
const isMoveValid = (player, newX, newY) => {
  // Check if the move is within the bounds of the grid
  if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) return false;

  // Check if the move is only one step in any direction
  const { x, y } = gameState.players[player];
  const isValidStep = Math.abs(newX - x) <= 1 && Math.abs(newY - y) <= 1;
  
  // Check if the new position is an obstacle
  const isObstacle = gameState.obstacles.some(obstacle => obstacle.x === newX && obstacle.y === newY);

  return isValidStep && !isObstacle;
};

const makeMove = (player, newX, newY) => {
  if (gameState.turn !== player) return { error: 'Not your turn' };
  if (!isMoveValid(player, newX, newY)) return { error: 'Invalid move' };

  gameState.players[player].x = newX;
  gameState.players[player].y = newY;

  // Switch turn and generate obstacles
  switchTurnAndGenerateObstacles();

  return { success: true, gameState };
};

// Función para verificar si hay un ganador
const checkWinner = () => {
  const player1 = gameState.players.player1;
  const player2 = gameState.players.player2;

  // Revisar si player1 ha llegado a la base de player2
  if (player1.x === player2.base.x && player1.y === player2.base.y) {
    return 'player1';
  }

  // Revisar si player2 ha llegado a la base de player1
  if (player2.x === player1.base.x && player2.y === player1.base.y) {
    return 'player2';
  }

  return null; // Si no hay un ganador aún
};

// Modificación de la función resetGame
const resetGame = () => {
    gameState = initialGameState(); // Reiniciamos el juego a su estado inicial
    generateRandomObstacles(gameState); // Generamos los obstáculos después de reiniciar
    console.log('Game state after reset:', gameState); // Añadimos un log para ver el estado del juego en consola
    return gameState; // Devolvemos el estado actualizado para que el frontend pueda renderizarlo
  };

module.exports = {
  gameState,
  makeMove,
  checkWinner,
  resetGame
};