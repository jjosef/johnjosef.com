using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace JJosefDB.Models;

public enum TopicStatus
{
  created,
  selected,
  started,
  completed,
}

public enum TopicCategory
{
  uncategorized,
  code,
  photo,
  video,
  written,
}

public class Topic
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public String? Id { get; set; }

  [BsonElement("title")]
  public required String Title { get; set; }

  [BsonElement("slug")]
  public required String Slug { get; set; }

  [BsonElement("status")]
  public required TopicStatus Status { get; set; } = TopicStatus.created;

  [BsonElement("category")]
  public TopicCategory Category { get; set; } = TopicCategory.uncategorized;

  [BsonElement("tags")]
  public String[] Tags { get; set; } = [];

  [BsonElement("content")]
  public required String Content { get; set; } = String.Empty;

  [BsonElement("created_at")]
  public required DateTime CreatedAt { get; set; } = DateTime.Now;

  [BsonElement("updated_at")]
  public required DateTime UpdatedAt { get; set; } = DateTime.Now;
}
