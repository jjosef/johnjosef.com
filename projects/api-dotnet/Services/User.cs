using JJosefDB.Interfaces;
using JJosefDB.Models;
using MongoDB.Bson;

namespace JJosefDB.Services;

public class UserService : IUserService
{
  private readonly IUserRepository _userRepository;

  public UserService(IUserRepository userRepository)
  {
    _userRepository = userRepository;
  }

  public Task<bool> IsEmpty()
  {
    return _userRepository.IsEmpty();
  }

  public async Task<User?> GetById(string userId)
  {
    var user = await _userRepository.GetById(userId);

    return user;
  }

  public async Task<User> Add(User user)
  {
    var newUser = await _userRepository.Add(user);

    return newUser;
  }

  public async Task<User?> Update(User user)
  {
    var result = await _userRepository.Update(user);

    return result;
  }

  public async Task<bool> Delete(string userId)
  {
    var result = await _userRepository.Delete(userId);

    return result;
  }
}
