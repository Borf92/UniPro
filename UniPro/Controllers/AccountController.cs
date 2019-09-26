using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UniProCore.Identity;

namespace UniProWeb.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        //private readonly SignInManager<ApplicationUser> _signInManager;
 
        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            //_signInManager = signInManager;
        }

        [HttpGet,Authorize]
        public IActionResult Get()
        {
            return Ok(new [] { "John Doe", "Jane Doe" });
        }

        [HttpPost]
        [Authorize]
        [Route("api/applicationuser/adduser")]
        public async Task<IActionResult> AddUser(ApplicationUser user)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await _userManager.CreateAsync(user);
            //_signInManager.

            return Ok(result);
        }
    }
}
