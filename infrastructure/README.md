# Infrastructure

- This creates the OIDC provider and IAM roles that allow GitHub Actions to manage AWS resources without long lived tokens.
- These IAM resources are required to enable all other workflows. Hence they are created once as follows:
  - Use Terraform Cloud
  - Set AWS tokens with IAM permissions as secrets in Terraform Cloud
  - Apply the Terraform config to create the resources
  - Delete the AWS tokens from Terraform Cloud

## References

- https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html
- https://medium.com/@thiagosalvatore/using-terraform-to-connect-github-actions-and-aws-with-oidc-0e3d27f00123
