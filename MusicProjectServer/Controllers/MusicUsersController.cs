﻿using Microsoft.AspNetCore.Mvc;
using MusicProjectServer.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MusicProjectServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusicUsersController : ControllerBase
    {
        // POST api/<MusicUsersController>
        [HttpPost]
        [Route("Registration")]
        public bool Registration(MusicUser user)
        {
            return user.Registration();
        }

        [HttpPost]
        [Route("AddToFavorites")]
        public bool AddToFavorites(int userId, int songId)
        {
            return MusicUser.AddToFavorites(userId, songId);
        }

        [HttpPost]
        [Route("RemoveFromFavorites")]
        public bool RemoveFromFavorites(int userId, int songId)
        {
            return MusicUser.AddToFavorites(userId, songId);
        }

        [HttpPost]
        [Route("GetFavorites")]
        public List<Song> GetFavorites(int userId)
        {
            return MusicUser.GetFavorites(userId);
        }

        [HttpPost]
        [Route("LogIn")]
        public MusicUser LogIn(string emailToLogin, string passwordToLogin)
        {
            return MusicUser.LogIn(emailToLogin, passwordToLogin);
        }
    }
}