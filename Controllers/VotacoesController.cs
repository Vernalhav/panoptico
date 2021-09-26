using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MonitorPoliticoMAC413.Data;

namespace MonitorPoliticoMAC413.Controllers
{
    [Route("votacoes")]
    public class VotacoesController : Controller
    {
        public VotacoesController(DataContext ctx)
        {
            _ctx = ctx;
        }

        private DataContext _ctx { get; }

        // GET
        public async Task<IActionResult> Index()
        {
            return Page();
        }
    }
}