document.addEventListener('DOMContentLoaded', () => {
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
        const baseColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown'];
        let colors = [];
        const totalPairs = (boardSize * boardSize) / 2;
        const existingColors = new Set(baseColors);

        // Add base colors first
        for (let i = 0; i < baseColors.length && colors.length < totalPairs; i++) {
            colors.push(baseColors[i]);
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
            card.style.backgroundColor = 'gray'; // Set the initial background color to gray
            card.addEventListener('click', flipCard); // Add event listener for flipping the card
            gameBoard.appendChild(card);
        }
    }

    // Variables to keep track of the game state
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    // Function to flip a card
    function flipCard() {
        if (lockBoard) return; // If the board is locked, do nothing
        if (this === firstCard) return; // If the same card is clicked twice, do nothing

        this.style.backgroundColor = this.dataset.color; // Reveal the card's true color
        this.classList.add('revealed'); // Add the 'revealed' class to show the card's color

        if (!hasFlippedCard) {
            // If no card has been flipped yet
            hasFlippedCard = true;
            firstCard = this; // Set the first card
            return;
        }

        // If this is the second card being flipped
        secondCard = this;
        lockBoard = true; // Lock the board to prevent further clicks

        // Check if the cards match
        if (firstCard.dataset.color === secondCard.dataset.color) {
            // If the cards match, disable them
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            resetBoard();
        } else {
            // If the cards do not match, flip them back after a short delay
            setTimeout(() => {
                firstCard.style.backgroundColor = 'gray';
                secondCard.style.backgroundColor = 'gray';
                firstCard.classList.remove('revealed');
                secondCard.classList.remove('revealed');
                resetBoard();
            }, 1000);
        }
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

    // Initialize the default game board (e.g., 4x4)
    initializeGameBoard(4);
});
