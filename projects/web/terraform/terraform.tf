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

# TODO:
# s3 bucket and upload dist folder contents, s3 bucket website config, route53 zone and record

module "dir" {
  source  = "hashicorp/dir/template"
  version = "1.0.2"
  base_dir = abspath("${path.module}/../dist")
}