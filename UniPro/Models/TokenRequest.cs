using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace UniProWeb.Models
{
    public class TokenRequest : TokenModel
    {
        [Required]
        [JsonProperty("username")]
        public string UserName { get; set; }

        [Required]
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}
