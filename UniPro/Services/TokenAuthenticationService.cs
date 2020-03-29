using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UniProCore.Identity;
using UniProWeb.Models;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authentication;

namespace UniProWeb.Services
{
    public class TokenAuthenticationService : IAuthenticateService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly TokenManagement _tokenManagement;

        private readonly SignInManager<ApplicationUser> _signInManager;
        public TokenAuthenticationService(UserManager<ApplicationUser> service, IOptions<TokenManagement> tokenManagement, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = service;
            _tokenManagement = tokenManagement.Value;
            _signInManager = signInManager;
        }
        public bool IsAuthenticated(TokenRequest request, ApplicationUser user, out string token, out string refreshToken)
        {
            token = string.Empty;
            refreshToken = GenerateRefreshToken();

            //if (!Task.Run(() => _userManager.CheckPasswordAsync(user, request.Password)).Result) return false;
            var signInResult = Task.Run(() => _signInManager.CheckPasswordSignInAsync(user, request.Password, false)).Result;
            if (!signInResult.Succeeded) return false;
            //Task.Run(() => _signInManager.SignInAsync(user, new AuthenticationProperties { }));

            var claim = new[]
            {
                new Claim(ClaimTypes.Name, request.UserName),
                new Claim(ClaimTypes.X500DistinguishedName, refreshToken)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenManagement.SecretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var jwtToken = new JwtSecurityToken(
                issuer: _tokenManagement.Issuer,
                audience: _tokenManagement.Audience,
                claims: claim,
                notBefore: DateTime.UtcNow,
                expires: DateTime.Now.AddMinutes(_tokenManagement.AccessExpiration),
                signingCredentials: credentials
            );
            token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            return true;
        }
        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token, RefreshTokenRequest refreshTokenRequest)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true, //you might want to validate the audience and issuer depending on your use case
                ValidAudience = refreshTokenRequest.Client_Audience,
                ValidateIssuer = true,
                ValidIssuer = refreshTokenRequest.Client_Issuer,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(refreshTokenRequest.Client_Secret)),
                ValidateLifetime = false, //here we are saying that we don't care about the token's expiration date

            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }

        public bool IsCreateNewToken(string userName, out string newToken, out string newRefreshToken)
        {
            newRefreshToken = GenerateRefreshToken();
            var claim = new[]
            {
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.X500DistinguishedName, newRefreshToken)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenManagement.SecretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var jwtToken = new JwtSecurityToken(
                issuer: _tokenManagement.Issuer,
                audience: _tokenManagement.Audience,
                claims: claim,
                notBefore: DateTime.UtcNow,
                expires: DateTime.Now.AddMinutes(_tokenManagement.AccessExpiration),
                signingCredentials: credentials
            );
            newToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            return true;
        }

    }
}