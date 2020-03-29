using System.Security.Claims;
using UniProCore.Identity;
using UniProWeb.Models;

namespace UniProWeb.Services
{
    public interface IAuthenticateService
    {
        bool IsAuthenticated(TokenRequest request, ApplicationUser user, out string token, out string refreshToken);
        bool IsCreateNewToken(string userName, out string newToken, out string newRefreshToken);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token, RefreshTokenRequest refreshTokenRequest);
    }
}