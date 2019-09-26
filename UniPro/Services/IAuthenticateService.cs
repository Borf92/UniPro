using System.Security.Claims;
using UniProCore.Identity;
using UniProWeb.Models;

namespace UniProWeb.Services
{
    public interface IAuthenticateService
    {
        public bool IsAuthenticated(TokenRequest request, ApplicationUser user, out string token, out string refreshToken);
        public bool IsCreateNewToken(string userName, out string newToken, out string newRefreshToken);
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}