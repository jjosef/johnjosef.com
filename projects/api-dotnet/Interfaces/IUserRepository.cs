using JJosefDB.Models;
using MongoDB.Bson;

namespace JJosefDB.Interfaces;

public interface IUserRepository
{
  Task<bool> IsEmpty();
  Task<User> Add(User user);
  Task<User?> GetById(String userId);
  Task<User?> Update(User user);
  Task<bool> Delete(String userId);
}
