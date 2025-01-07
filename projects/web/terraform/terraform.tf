terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.82.2"
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

resource "aws_s3_bucket_versioning" "website_bucket_versioning" {
  bucket = aws_s3_bucket.website_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "website_bucket_public_access" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "frontend_bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id

  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": [
          "${aws_s3_bucket.website_bucket.arn}",
          "${aws_s3_bucket.website_bucket.arn}/**"
        ]
      }
    ]
  })

  depends_on = [
    aws_s3_bucket_public_access_block.website_bucket_public_access
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

resource "aws_acm_certificate" "cert" {
  domain_name = var.domain_name
  validation_method = "DNS"
  subject_alternative_names = [
    "*.${var.domain_name}",
  ]
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert : record.fqdn]

  depends_on = [
    aws_route53_record.cert
  ]
}

resource "aws_cloudfront_distribution" "distribution" {
  origin {
    domain_name = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.website_bucket.id
  }

  aliases = ["www.${var.domain_name}", var.domain_name]
  enabled = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.website_bucket.id

    viewer_protocol_policy = "redirect-to-https"

    min_ttl = 0
    default_ttl = 0
    max_ttl = 0

    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
      }
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.arn
    ssl_support_method = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  depends_on = [
    aws_acm_certificate.cert
  ]
}

resource "aws_route53_record" "cert" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 5
  type            = each.value.type
  zone_id         = data.aws_route53_zone.main.zone_id

  depends_on = [
    aws_acm_certificate.cert
  ]
}

resource "aws_route53_record" "website" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.distribution.domain_name
    zone_id                = aws_cloudfront_distribution.distribution.hosted_zone_id
    evaluate_target_health = false
  }

  depends_on = [
    aws_cloudfront_distribution.distribution
  ]
}

resource "aws_route53_record" "website-www" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "CNAME"
  ttl     = 5
  records = [var.domain_name]

  depends_on = [
    aws_route53_record.website
  ]
}

// Create the zone manually to avoid any issues with registrar
data "aws_route53_zone" "main" {
  name = var.domain_name
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.distribution.domain_name
}