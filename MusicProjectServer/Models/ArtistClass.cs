using System;
namespace MusicProjectServer.Models
{
	public class ArtistClass
	{
        private string Name { get; set; }
		private int Id { get; set; }

        public ArtistClass()
		{
			Name = "";
		}

        public ArtistClass(string name, int id)
        {
            Name = name;
            Id = id;
        }
    }
}

