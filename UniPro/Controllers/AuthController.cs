using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using UniProCore.Identity;
using UniProWeb.Models;

namespace UniProWeb.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        //private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            //_signInManager = signInManager;
        }

        // GET api/values
        [HttpPost]
        [Route("/login")]
        public async Task<IActionResult> Login([FromBody]LoginModel user)
        {
            if (user == null) return BadRequest("Invalid client request");

            var currentUser = await _userManager.FindByNameAsync(user.UserName);

            if (!await _userManager.CheckPasswordAsync(currentUser, user.Password)) return Unauthorized();

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokeOptions = new JwtSecurityToken(
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new { Token = tokenString });
        }
    }
}
