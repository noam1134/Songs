using Microsoft.AspNetCore.Mvc;
using MusicProjectServer.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MusicProjectServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusicUsersController : ControllerBase
    {
        // GET: api/<MusicUsersController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<MusicUsersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<MusicUsersController>
        [HttpPost]
        [Route("Registration")]
        public bool Registration(MusicUser user)
        {
            return user.Registration();
        }

        // PUT api/<MusicUsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<MusicUsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpPost]
        [Route("LogIn")]
        public MusicUser LogIn(string emailToLogin, string passwordToLogin)
        {
            return MusicUser.LogIn(emailToLogin, passwordToLogin);
        }
    }
}
