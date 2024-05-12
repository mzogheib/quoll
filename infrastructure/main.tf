terraform { 
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}


variable "repo_name" {
  description = "The name of the private ECR repo"
  type        = string
}

resource "aws_ecr_repository" "main" {
  name                 = var.repo_name
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_instance" "api_server" {
  ami           = "ami-07caf09b362be10b8"
  instance_type = "t2.micro"

  tags = {
    Name = "quoll-api"
  }
}

output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.api_server.public_ip
}
