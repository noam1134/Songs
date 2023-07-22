namespace MusicProjectServer.Models
{
    public class Score
    {
        private int id;
        private int userScore;
        private int userId;

        public Score(int id, int userScore, int userId)
        {
            Id = id;
            UserScore = userScore;
            UserId = userId;
        }

        public Score()
        {
            Id = 0;
            UserScore = 0;
            UserId = 0;
        }

        public int Id { get => id; set => id = value; }
        public int UserScore { get => userScore; set => userScore = value; }
        public int UserId { get => userId; set => userId = value; }
    }
}
