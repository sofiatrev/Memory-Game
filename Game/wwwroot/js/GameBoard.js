document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let firstCard, secondCard;
    let hasFlippedCard = false;
    let lockBoard = false;

    // Define and shuffle colors
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown'];
    const doubledColors = [...colors, ...colors];
    doubledColors.sort(() => 0.5 - Math.random());

    // Assign colors to cards
    cards.forEach((card, index) => {
        card.style.backgroundColor = doubledColors[index];
        card.dataset.color = doubledColors[index]; // Store color in data attribute for matching logic
    });

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('revealed');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.color === secondCard.dataset.color;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('revealed');
            secondCard.classList.remove('revealed');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    cards.forEach(card => card.addEventListener('click', flipCard));
});