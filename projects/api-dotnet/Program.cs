using JJosefDB.Context;
using JJosefDB.Dependencies;
using Microsoft.EntityFrameworkCore;

namespace JJosefDB;

internal static class Program
{
  private static async Task Main(string[] args)
  {
    var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
    var dbName = Environment.GetEnvironmentVariable("MONGODB_DB_NAME");
    if (connectionString == null)
    {
      Console.WriteLine("You must set your 'MONGODB_URI' environment variable.");
      Environment.Exit(0);
    }
    if (dbName == null)
    {
      dbName = "jjosefdb";
    }

    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddDbContextFactory<JJosefDBContext>(optionsBuilder =>
      optionsBuilder.UseMongoDB(connectionString: connectionString, databaseName: dbName)
    );

    builder.Services.AddControllers();

    builder.Services.AddOpenApi();

    builder.Services.ResolveDependencies();

    var app = builder.Build();

    app.MapOpenApi();

    app.MapControllers();

    app.MapGet("/", () => "Hello world!");

    await app.RunAsync();
  }
}
