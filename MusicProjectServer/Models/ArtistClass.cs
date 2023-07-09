using System;
namespace MusicProjectServer.Models
{
	public class ArtistClass
	{
        private string Name { get; set; }
		private int Id { get; set; }
        private int Popularity { get; set; }

        public ArtistClass()
		{
			Name = "";
            Popularity = 0; 
		}

        public ArtistClass(string name, int id, int popularity)
        {
            Popularity = popularity;
            Name = name;
            Id = id;
        }
    }
}

