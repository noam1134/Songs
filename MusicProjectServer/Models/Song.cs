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
            SongId = 0;
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

        public static List<Song> GetSongsByName(string songName)
        {
            return dBservices.GetSongsByName(songName);
        }

        public static List<Song> GetAllSongsByArtistName(string artistName)
        {
            return dBservices.GetAllSongsByArtistName(artistName);
        }

        public static List<Song> GetAllSongsByLyrics(string lyrics)
        {
            return dBservices.GetAllSongsByLyrics(lyrics);
        }
    }
}
