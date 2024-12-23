using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace JJosefDB.Models;

public class Article
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public ObjectId Id { get; set; }

  [BsonElement("title")]
  public required String Title { get; set; }

  [BsonElement("slug")]
  public required String Slug { get; set; }

  [BsonElement("topic")]
  public String? Topic { get; set; }

  [BsonElement("tags")]
  public String[] Tags { get; set; } = [];

  [BsonElement("content")]
  public required String Content { get; set; }
}
