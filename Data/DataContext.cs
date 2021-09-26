using Microsoft.EntityFrameworkCore;
using MonitorPoliticoMAC413.Models;

namespace MonitorPoliticoMAC413.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Votacao> Votacoes { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseInMemoryDatabase("MAC413");
        }
    }
}