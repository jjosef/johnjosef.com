using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

public class AuthenticationMiddleware : IMiddleware
{
  public async Task InvokeAsync(HttpContext context, RequestDelegate next)
  {
    // TODO: make check for JWT
    var isAuthenticated = true;

    if (isAuthenticated)
    {
      // Set the authenticated user
      var identity = new ClaimsIdentity([new Claim(ClaimTypes.Name, "username")], "custom");
      context.User = new ClaimsPrincipal(identity);
    }
    else
    {
      // Handle authentication failure, e.g., redirect to login page
      context.Response.Redirect("/login");
      return;
    }

    await next.Invoke(context);
  }
}
