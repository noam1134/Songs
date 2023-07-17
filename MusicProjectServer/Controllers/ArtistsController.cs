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

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        [Route("AddArtist")]
        public bool AddArtist(string artName)
        {
            return ArtistClass.AddArtist(artName);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

