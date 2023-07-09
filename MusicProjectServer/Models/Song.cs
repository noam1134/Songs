namespace MusicProjectServer.Models
{
    public class Song
    {
        private int songId;
        private string songName; //saved in excell as 'song'
        private string lyrics; //saved in excell as 'text'
        private string link;
        private ArtistClass artist;

        public Song()
        {
            SongName = "";
            Lyrics = "";
            Link = "";
            Artist = new ArtistClass();
        }
        public Song(ArtistClass artist,int songId, string songName, string text, string link)
        {
            Artist = artist;
            SongId = songId;
            SongName = songName;
            Lyrics = text;
            Link = link;
        }

        public ArtistClass Artist { get => artist; set => artist = value; }
        public int SongId { get => songId; set => songId = value; }
        public string SongName { get => songName; set => songName = value; }
        public string Lyrics { get => lyrics; set => lyrics = value; }
        public string Link { get => link; set => link = value; }
    }
}
