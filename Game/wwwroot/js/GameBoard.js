document.addEventListener('DOMContentLoaded', () => {
    // Select all card elements
    const cards = document.querySelectorAll('.card');
    let firstCard, secondCard;
    let hasFlippedCard = false;
    let lockBoard = false;

    // Define and shuffle colors
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown'];
    const doubledColors = [...colors, ...colors]; // Duplicate colors for pairs
    doubledColors.sort(() => 0.5 - Math.random()); // Shuffle the colors

    // Assign colors to cards
    cards.forEach((card, index) => {
        card.dataset.color = doubledColors[index]; // Store true color in data attribute for matching logic
        card.style.backgroundColor = 'gray'; // Set the initial background color to gray
    });

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
        checkForMatch(); // Check if the two cards match
    }

    // Function to check if two cards match
    function checkForMatch() {
        let isMatch = firstCard.dataset.color === secondCard.dataset.color; // Compare the colors of the two cards
        isMatch ? disableCards() : unflipCards(); // If they match, disable them; otherwise, unflip them
    }

    // Function to disable matched cards
    function disableCards() {
        firstCard.removeEventListener('click', flipCard); // Remove click event listener from the first card
        secondCard.removeEventListener('click', flipCard); // Remove click event listener from the second card
        resetBoard(); // Reset the board state
    }

    // Function to unflip unmatched cards
    function unflipCards() {
        lockBoard = true; // Lock the board to prevent further clicks
        setTimeout(() => {
            firstCard.style.backgroundColor = 'gray'; // Set the background color back to gray
            secondCard.style.backgroundColor = 'gray'; // Set the background color back to gray
            firstCard.classList.remove('revealed'); // Remove the 'revealed' class from the first card
            secondCard.classList.remove('revealed'); // Remove the 'revealed' class from the second card
            resetBoard(); // Reset the board state
        }, 1500); // Wait for 1.5 seconds before unflipping the cards
    }

    // Function to reset the board state
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false]; // Reset the flipped card and lock board flags
        [firstCard, secondCard] = [null, null]; // Reset the first and second card variables
    }

    // Add click event listener to each card
    cards.forEach(card => card.addEventListener('click', flipCard));
});