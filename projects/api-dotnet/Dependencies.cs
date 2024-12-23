using JJosefDB.Context;
using JJosefDB.Interfaces;
using JJosefDB.Repositories;
using JJosefDB.Services;

namespace JJosefDB.Dependencies;

public static class DependencyInjection
{
  public static IServiceCollection ResolveDependencies(this IServiceCollection services)
  {
    services.AddScoped<JJosefDBContext>();
    services.AddScoped<IUserService, UserService>();
    services.AddScoped<IUserRepository, UserRepository>();
    return services;
  }
}
