namespace MusicProjectServer.Models
{
    public class Song
    {
        public int SongId { get; set; }
        public string SongName { get; set; }
        public string Lyrics { get; set; }
        public string Link { get; set; }
        public int ArtistId { get; set; }

        static DBservices dBservices = new DBservices();

        public Song()
        {
            SongName = "";
            Lyrics = "";
            Link = "";
            ArtistId = 0;
        }

        public Song(int songId, string songName, string lyrics, string link, int artistId)
        {
            SongId = songId;
            SongName = songName;
            Lyrics = lyrics;
            Link = link;
            ArtistId = artistId;
        }

        public static bool AddSong(Song sng)
        {
            return dBservices.AddSong(sng);
        }
    }
}
