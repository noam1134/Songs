﻿using Microsoft.AspNetCore.Mvc;
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
            Song song_1 = new Song(1, "Nuni", "Lehem Havita!", "https:" + "//" + "youtu.be" + "/" + "_RFUj-sGCp8");
            Song song_2 = new Song(2, "Poki", "Poki Pok!", "https:" + "//" + "youtu.be" + "/" + "_RFUj-sGCp8");
            return new List<Song> { song_1, song_2 };
        }

        // GET api/<SongsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SongsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SongsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SongsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}