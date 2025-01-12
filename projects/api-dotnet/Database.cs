using JJosefDB.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

namespace JJosefDB.Context;

public class JJosefDBContext : DbContext
{
  public DbSet<User> Users { get; set; }
  public DbSet<Topic> Topics { get; set; }

  public static JJosefDBContext Create(IMongoDatabase database) =>
    new(
      new DbContextOptionsBuilder<JJosefDBContext>()
        .UseMongoDB(database.Client, database.DatabaseNamespace.DatabaseName)
        .Options
    );

  public JJosefDBContext(DbContextOptions options)
    : base(options)
  {
    this.Users = Set<User>();
    this.Topics = Set<Topic>();
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<User>().ToCollection("users").HasIndex(u => u.Username).IsUnique();
    modelBuilder.Entity<Topic>().ToCollection("topics");
  }
}
