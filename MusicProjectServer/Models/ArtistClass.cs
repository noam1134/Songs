using System;
namespace MusicProjectServer.Models
{
	public class ArtistClass
	{
        public string Name { get; set; }
        public int Id { get; set; }
        public int Popularity { get; set; } //number of times in users favorites

        static DBservices dBservices = new DBservices();

        public ArtistClass()
		{
			Name = "";
            Popularity = 0; 
		}

        public ArtistClass(string name, int id, int popularity)
        {
            Name = name;
            Id = id;
            Popularity = popularity;
            
        }

        public static bool AddArtist(ArtistClass art)
        {
            return dBservices.AddArtist(art);
        }
    }
}

