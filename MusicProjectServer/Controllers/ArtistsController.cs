using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MusicProjectServer.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MusicProjectServer.Controllers
{
    [Route("api/[controller]")]
    public class ArtistsController : Controller
    {
        // GET: api/values
        [HttpGet]
        [Route("GetArtistById")]
        public ArtistClass GetArtistById(int artistId)
        {
            return ArtistClass.GetArtistById(artistId);
        }

        [HttpGet]
        [Route("GetAllArtists")]
        public List<ArtistClass> GetAllArtists()
        {
            return ArtistClass.GetAllArtists();
        }

        // POST api/values
        [HttpPost]
        [Route("AddArtist")]
        public bool AddArtist(string artName)
        {
            return ArtistClass.AddArtist(artName);
        }
    }
}

