using JJosefDB.Context;
using JJosefDB.Interfaces;
using JJosefDB.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;

namespace JJosefDB.Repositories;

public class UserRepository : IUserRepository
{
  private readonly JJosefDBContext _dbContext;

  public UserRepository(JJosefDBContext dbContext)
  {
    _dbContext = dbContext;
  }

  public async Task<bool> IsEmpty()
  {
    var count = await _dbContext.Users.CountAsync();
    return count == 0;
  }

  public async Task<User> Add(User user)
  {
    _dbContext.Users.Add(user);
    await _dbContext.SaveChangesAsync();
    return user;
  }

  public async Task<User?> GetById(String userId)
  {
    var user = await _dbContext.Users.FindAsync(userId);
    if (user == null)
      return null;

    return user;
  }

  public async Task<User?> Update(User user)
  {
    if (user.Id == null)
      return null;
    var existingUser = await GetById(user.Id);

    if (existingUser == null)
      return null;

    existingUser.DisplayName = user.DisplayName;

    await _dbContext.SaveChangesAsync();

    return user;
  }

  public async Task<bool> Delete(String userId)
  {
    var existingUser = await GetById(userId);

    if (existingUser == null)
      return false;

    _dbContext.Users.Remove(existingUser);

    await _dbContext.SaveChangesAsync();

    return true;
  }
}
