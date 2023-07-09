using System;
namespace MusicProjectServer.Models
{
	public class ArtistClass
	{
        private string Name { get; set; }
		private int Id { get; set; }
        private int Popularity { get; set; } //number of times in users favorites

        public ArtistClass()
		{
			Name = "vbxv";
            Popularity = 0; 
		}

        public ArtistClass(string name, int id, int popularity)
        {
            Name = name;
            Id = id;
            Popularity = popularity;
            
        }
    }
}

