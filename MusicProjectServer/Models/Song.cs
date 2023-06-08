namespace MusicProjectServer.Models
{
    public class Song
    {
        private int songId;
        private string songName;
        private string text;
        private string link;

        public Song()
        {
            SongName = "";
            Text = "";
            Link = "";
        }
        public Song(int songId, string songName, string text, string link)
        {
            SongId = songId;
            SongName = songName;
            Text = text;
            Link = link;
        }

        public int SongId { get => songId; set => songId = value; }
        public string SongName { get => songName; set => songName = value; }
        public string Text { get => text; set => text = value; }
        public string Link { get => link; set => link = value; }
    }
}
