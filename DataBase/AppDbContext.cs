using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<SquareModel> Squares { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }
}