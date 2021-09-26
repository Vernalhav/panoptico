using System;
using System.ComponentModel.DataAnnotations;

namespace MonitorPoliticoMAC413.Models
{
    public class Votacao
    {
        [Key]
        public string Id { get; set; }
        
        public string URI { get; set; }

        public DateTime Data { get; set; }

        public string ProposicaoEmenta { get; set; }

        public uint VotosSim { get; set; }

        public uint VotosNao { get; set; }

        public Boolean Aprovado { get; set; }
    }
}
