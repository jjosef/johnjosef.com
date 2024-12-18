terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.81.0"
    }
  }

  backend "s3" {
    bucket         = "${var.domain_name}-tfstore"
    key            = "tfstate"
    region         = var.aws_region
  }
}

# TODO:
# s3 bucket and upload dist folder contents, s3 bucket website config, route53 zone and record