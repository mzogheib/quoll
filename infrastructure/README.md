# Infrastructure

- This creates the OIDC provider and IAM roles that allow GitHub Actions to manage AWS resources without long lived tokens.
- These IAM resources are required to enable all other workflows. Hence they are created once as follows:
  - Use Terraform Cloud
  - Set AWS tokens with IAM permissions as secrets in Terraform Cloud
  - Apply the Terraform config to create the resources
  - Delete the AWS tokens from Terraform Cloud

## References

- How to configure the GitHub identity provider in AWS
  - https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
  - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html
- How to do the above using Terraform
  - https://medium.com/@thiagosalvatore/using-terraform-to-connect-github-actions-and-aws-with-oidc-0e3d27f00123
- Integrating with GitHub Actions workflows
  - https://github.com/aws-actions/configure-aws-credentials?tab=readme-ov-file#oidc
