﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using UniProCore.Identity;
using UniProWeb.Models;
using UniProWeb.Services;

namespace UniProWeb.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthenticateService _authService;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthController(IAuthenticateService authService, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _authService = authService;
            _signInManager = signInManager;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> Get(TokenRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Request");
            }

            var currentUser = await _userManager.FindByNameAsync(request.UserName);
            if (currentUser == null) return NotFound("User not found");
            var userRole = await _userManager.GetRolesAsync(currentUser);
            if (userRole == null) return BadRequest("User not found");


            if (_authService.IsAuthenticated(request, currentUser, out string token, out string refreshToken))
            {
                return Ok(new
                {
                    access_token = token,
                    userRole = userRole.First(),
                    userId = currentUser.Id,
                    refresh_token = refreshToken
                });
            }

            return BadRequest("Invalid Request");
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Refresh(RefreshTokenRequest refreshTokenRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Request");
            }

            var token = HttpContext.Request.Headers["Authorization"];
            var principal = _authService.GetPrincipalFromExpiredToken(token, refreshTokenRequest);
            var username = principal.Identity.Name;
            if (!principal.HasClaim(ClaimTypes.X500DistinguishedName, refreshTokenRequest.Refresh_Token))
                throw new SecurityTokenException("Invalid refresh token");

            if (!_authService.IsCreateNewToken(username, out string newToken, out string newRefreshToken)) return BadRequest();

            return new ObjectResult(new
            {
                access_token = newToken,
                refresh_token = newRefreshToken
            });
        }
    }
}
