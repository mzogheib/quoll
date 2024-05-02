terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

#
# Configure the AWS Provider
#
provider "aws" {
  region = "us-east-1"
}


#
# Create the identity provider
#
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com",
  ]

  thumbprint_list = ["ffffffffffffffffffffffffffffffffffffffff"]
}

#
# Give GitHub the role required to create resources
#
data "aws_iam_policy_document" "oidc" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      values   = ["sts.amazonaws.com"]
      variable = "token.actions.githubusercontent.com:aud"
    }

    condition {
      test     = "StringLike"
      values   = ["repo:mzogheib/quoll:*"]
      variable = "token.actions.githubusercontent.com:sub"
    }
  }
}

resource "aws_iam_role" "github_actions" {
  name               = "quoll-github-actions-oidc-role"
  assume_role_policy = data.aws_iam_policy_document.oidc.json
}

#
# Give all ECR permissions to the role
#
data "aws_iam_policy_document" "deploy" {
  statement {
    effect  = "Allow"
    actions = [
      "ecr:*",
    ]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "deploy" {
  name        = "quoll-github-actions-deploy-policy"
  description = "Policy used for deployments on GitHub Actions"
  policy      = data.aws_iam_policy_document.deploy.json
}

resource "aws_iam_role_policy_attachment" "attach-deploy" {
  role       = aws_iam_role.github_actions.name
  policy_arn = aws_iam_policy.deploy.arn
}
