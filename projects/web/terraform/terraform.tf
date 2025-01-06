terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.81.0"
    }
  }

  backend "s3" {
  }
}

module "dir" {
  source  = "hashicorp/dir/template"
  version = "1.0.2"
  base_dir = abspath("${path.module}/../dist")
}

resource "aws_s3_bucket" "website_bucket" {
  bucket = var.s3_bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_acl" "website_bucket_acl" {
  bucket = aws_s3_bucket.website_bucket.id
  acl    = "public-read"
  depends_on = [aws_s3_bucket_public_access_block.frontend_public_access_block, aws_s3_bucket_ownership_controls.ownership_controls_config_bucket]
}

resource "aws_s3_bucket_versioning" "website_bucket_versioning" {
  bucket = aws_s3_bucket.website_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "frontend_public_access_block" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_ownership_controls" "ownership_controls_config_bucket" {
  bucket = aws_s3_bucket.website_bucket.id

  rule {
    object_ownership = "ObjectWriter"
  }
}

resource "aws_s3_bucket_policy" "frontend_bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id

  policy = <<POLICY
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::${aws_s3_bucket.website_bucket.id}/*"
      }
    ]
  }
  POLICY

  depends_on = [
    aws_s3_bucket_public_access_block.frontend_public_access_block,
  ]
}

resource "aws_s3_bucket_website_configuration" "website_configuration" {
  bucket = aws_s3_bucket.website_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_object" "website_files" {
  for_each = module.dir.files

  bucket       = aws_s3_bucket.website_bucket.id
  key          = each.key
  content_type = each.value.content_type

  source  = each.value.source_path

  etag = each.value.digests.md5
}

resource "aws_route53_record" "website" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_s3_bucket_website_configuration.website_configuration.website_domain
    zone_id                = aws_s3_bucket.website_bucket.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_zone" "main" {
  name = var.domain_name
}

output "website_url" {
  value = aws_s3_bucket_website_configuration.website_configuration.website_endpoint
}