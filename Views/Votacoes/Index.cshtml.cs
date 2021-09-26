using System;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MonitorPoliticoMAC413.Views.Votacoes
{
    public class Index : PageModel
    {
        public string foobar;

        public Index()
        {
            Console.WriteLine("CHEOGU AUQI");
            foobar = "olar";
        }

        public string[] Votacoes { get; set; } = {"VOTACAO1", "VOTACAO2"};

        public void OnGet()
        {
        }
    }
}