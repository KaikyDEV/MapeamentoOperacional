using MAPEAMENTO.Entidade;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    internal readonly object Status;

    public DbSet<Erro> Erros { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }
}