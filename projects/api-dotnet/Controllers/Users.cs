using JJosefDB.Interfaces;
using JJosefDB.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace JJosefDB.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
  private readonly IUserService _userService;

  public UsersController(IUserService userService)
  {
    _userService = userService;
  }

  [HttpPost("firstuser")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<IActionResult> FirstUser([FromBody] User user)
  {
    var isEmpty = await _userService.IsEmpty();
    if (!isEmpty)
    {
      // Return a 404 if we've already populated the first user.
      return NotFound();
    }
    var firstUser = new User()
    {
      Username = user.Username,
      OtpSecret = "",
      DisplayName = user.DisplayName,
    };
    var result = await _userService.Add(firstUser);

    return Ok(result);
  }

  [HttpGet("{userId}")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<IActionResult> GetById(string userId)
  {
    if (userId == String.Empty || !ObjectId.TryParse(userId, out _))
    {
      return BadRequest($"{nameof(userId)} must be a valid ObjectId string");
    }
    var user = await _userService.GetById(userId);
    if (user == null)
      return NotFound();

    return Ok(user);
  }
}
