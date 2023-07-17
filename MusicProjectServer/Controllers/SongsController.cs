using Microsoft.AspNetCore.Mvc;
using MusicProjectServer.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MusicProjectServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        // GET: api/<SongsController>
        [HttpGet]
        public List<Song> Get()
        {
            return null;
        }

        // POST api/<SongsController>
        [HttpPost]
        [Route("AddSong")]
        public bool AddSong(Song sng)
        {
            return Song.AddSong(sng);
        }
    }
}
