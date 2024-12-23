using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace JJosefDB.Models;

[Index(nameof(Username), IsUnique = true)]
public class User
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public String? Id { get; set; }

  [BsonElement("username")]
  public required String Username { get; set; }

  [BsonElement("otpSecret")]
  public String? OtpSecret { get; set; }

  [BsonElement("displayName")]
  public String? DisplayName { get; set; }
}
