﻿using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace UniProWeb.Models
{
    public class RefreshTokenRequest : TokenModel
    {       
        [Required]
        [JsonProperty("refresh_token")]
        public string Refresh_Token { get; set; }
    }
}
