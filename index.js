const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { gameState, makeMove, checkWinner, resetGame } = require('./gameLogic');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Obtener el estado del juego actual
app.get('/game', (req, res) => {
  res.json(gameState);
});

// Resetear el juego
app.post('/game/reset', (req, res) => {
    const newGameState = resetGame(); // Reiniciamos el juego y obtenemos el nuevo estado
    res.json(newGameState); // Enviamos el nuevo estado del juego al cliente
  });

// Mover a un jugador
app.post('/game/move', (req, res) => {
  const { player, x, y } = req.body;
  const result = makeMove(player, x, y);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  const winner = checkWinner();
  if (winner) {
    return res.json({ message: `${winner} wins!`, gameState });
  }

  res.json(result);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});