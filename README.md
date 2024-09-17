Multiplayer Strategy Game

This is a simple turn-based multiplayer strategy game built using Express.js for the backend and HTML/CSS/JavaScript for the frontend. Players take turns moving on a 10x10 grid, trying to capture each other’s base. The game includes obstacles that are randomly generated after each player’s turn, adding an extra challenge.

Features

	•	Two Players: Player 1 starts in the top-left corner and Player 2 in the bottom-right.
	•	Turn-based Gameplay: Players take turns moving one step in any direction (up, down, left, or right).
	•	Capture the Base: The goal is to reach and capture the opponent’s base.
	•	Random Obstacles: After each turn, obstacles are randomly generated on the grid, blocking player movement.
	•	Game Reset: Players can reset the game to start over with new obstacles.

Tech Stack

	•	Backend: Express.js for handling the game logic and RESTful API endpoints.
	•	Frontend: HTML, CSS, and JavaScript to render the game board and handle player interactions.
	•	Grid-Based Movement: Players can only move one step per turn, with obstacles preventing movement through certain tiles.

How to Run

	1.	Clone the repository.
	2.	Install dependencies using npm install.
	3.	Start the server using node index.js.
	4.	Open your browser and navigate to http://localhost:3000 to start playing.

Future Enhancements

	•	Add special abilities for each player.
	•	Include power-ups or collectible items.
	•	Implement a “fog of war” to hide certain parts of the grid from players.
	•	Allow multiple simultaneous game sessions.
