# Infrastructure

- Here is where we create the foundational infrastructure

## Authentication with AWS

- This is done manually using OIDC providers
- Refer to wiki

## ECR

- Set a GitHub secret `AWS_ECR_REPO_NAME` with the name of the repo
- Run the `terraform-apply` workflow with input `infrastructure/ecr`
- This builds the private repo via Terraform Cloud
- The registry URL and repo name will now be available to other workflows
