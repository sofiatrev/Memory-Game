document.addEventListener('DOMContentLoaded', () => {
    const BASE_COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown'];
    const DEFAULT_BOARD_SIZE = 4;
    const CARD_BACK_COLOR = 'gray';

    // Function to generate a random color
    function generateRandomColor(existingColors) {
        const letters = '0123456789ABCDEF';
        let color;
        do {
            color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        } while (existingColors.has(color)); // Ensure the color is unique
        return color;
    }

    // Function to generate colors based on board size
    function generateColors(boardSize) {
        let colors = [];
        const totalPairs = (boardSize * boardSize) / 2;
        const existingColors = new Set(BASE_COLORS);

        // Add base colors first
        for (let i = 0; i < BASE_COLORS.length && colors.length < totalPairs; i++) {
            colors.push(BASE_COLORS[i]);
        }

        // If still more colors are needed, generate random colors
        while (colors.length < totalPairs) {
            const newColor = generateRandomColor(existingColors);
            colors.push(newColor);
            existingColors.add(newColor);
        }

        console.log('Generated colors:', colors); // Debugging log
        return colors;
    }

    // Function to initialize the game board
    function initializeGameBoard(boardSize) {
        const colors = generateColors(boardSize);
        const doubledColors = [...colors, ...colors]; // Duplicate colors for pairs
        doubledColors.sort(() => 0.5 - Math.random()); // Shuffle the colors

        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = ''; // Clear existing cards
        gameBoard.dataset.size = `${boardSize}x${boardSize}`; // Set the data-size attribute

        // Create and append card elements
        for (let i = 0; i < doubledColors.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.color = doubledColors[i]; // Store true color in data attribute for matching logic
            card.classList.add('card-back'); // Set the initial background color to gray
            gameBoard.appendChild(card);
        }

        document.getElementById('game-over').style.display = 'none'; // Hide "Game over" message
    }

    // Function to start the game
    function startGame() {
        document.getElementById('start-game').style.display = 'none'; // Hide "Start game" button
        initializeGameBoard(DEFAULT_BOARD_SIZE); // Initialize the default game board (e.g., 4x4)
    }

    // Function to end the game
    function endGame() {
        document.getElementById('game-over').style.display = 'block'; // Show "Game over" message
    }

    // Variables to keep track of the game state
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    // Function to flip a card
    function flipCard(card) {
        if (lockBoard) return; // If the board is locked, do nothing
        if (card === firstCard) return; // If the same card is clicked twice, do nothing

        card.style.backgroundColor = card.dataset.color; // Reveal the card's true color
        card.classList.add('revealed'); // Add the 'revealed' class to show the card's color

        if (!hasFlippedCard) {
            // If no card has been flipped yet
            hasFlippedCard = true;
            firstCard = card; // Set the first card
            return;
        }

        // If this is the second card being flipped
        secondCard = card;
        lockBoard = true; // Lock the board to prevent further clicks

        // Check if the cards match
        if (firstCard.dataset.color === secondCard.dataset.color) {
            // If the cards match, disable them
            firstCard.removeEventListener('click', handleCardClick);
            secondCard.removeEventListener('click', handleCardClick);
            resetBoard();
        } else {
            // If the cards do not match, flip them back after a short delay
            setTimeout(() => {
                firstCard.style.backgroundColor = CARD_BACK_COLOR;
                secondCard.style.backgroundColor = CARD_BACK_COLOR;
                firstCard.classList.remove('revealed');
                secondCard.classList.remove('revealed');
                resetBoard();
            }, 1000);
        }
    }

    // Function to handle card click event
    function handleCardClick(event) {
        flipCard(event.target);
    }

    // Function to reset the board state
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // Event listeners for board size selection
    document.getElementById('boardSize4x4').addEventListener('click', () => initializeGameBoard(4));
    document.getElementById('boardSize6x6').addEventListener('click', () => initializeGameBoard(6));
    document.getElementById('boardSize8x8').addEventListener('click', () => initializeGameBoard(8));

    // Event listener for starting the game
    document.getElementById('start-game').addEventListener('click', startGame);

    // Initialize the game board only when the "Start game" button is clicked
    document.getElementById('game-board').addEventListener('click', (event) => {
        if (event.target.classList.contains('card')) {
            handleCardClick(event);
        }
    });
});
