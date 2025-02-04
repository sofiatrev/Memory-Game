namespace Game.Models
{
    public class Card
    {
        public int Id { get; set; }
        public string Color { get; set; }
        public string BasicColor { get; set; } = "gray"; // Default basic color
        public bool IsFaceUp { get; set; } = false; // Card starts face down
        public bool IsMatched { get; set; } = false; // Card is not matched initially

        // Method to flip the card
        public void Flip()
        {
            if (!IsMatched)
            {
                IsFaceUp = !IsFaceUp;
            }
        }

        // Method to mark the card as matched
        public void Match()
        {
            IsMatched = true;
        }
    }
}