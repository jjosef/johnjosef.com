# UI Terraform

If you don't have a default AWS Account set, make sure to set it.

`export AWS_PROFILE=<name of profile>`

To get execute the terraform plan:

- `terraform init -backend-config=dev.tfbackend`
- `terraform plan`
- `terraform apply`
