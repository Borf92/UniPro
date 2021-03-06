﻿using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace UniProWeb.Models
{
    public class TokenModel
    {
        [Required]
        [JsonProperty("grant_type")]
        public string Grant_Type { get; set; }

        [Required]
        [JsonProperty("client_issuer")]
        public string Client_Issuer { get; set; }
        
        [Required]
        [JsonProperty("client_audience")]
        public string Client_Audience { get; set; }

        [Required]
        [JsonProperty("client_secret")]
        public string Client_Secret { get; set; }

    }
}