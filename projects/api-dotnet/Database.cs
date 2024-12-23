using JJosefDB.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

namespace JJosefDB.Context;

public class JJosefDBContext : DbContext
{
  public DbSet<User> Users { get; init; }
  public DbSet<Article> Articles { get; init; }

  public static JJosefDBContext Create(IMongoDatabase database) =>
    new(
      new DbContextOptionsBuilder<JJosefDBContext>()
        .UseMongoDB(database.Client, database.DatabaseNamespace.DatabaseName)
        .Options
    );

  public JJosefDBContext(DbContextOptions options)
    : base(options) { }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<User>().ToCollection("users").HasIndex(u => u.Username).IsUnique();
    modelBuilder.Entity<Article>().ToCollection("articles");
  }
}
