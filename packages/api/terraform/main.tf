terraform {
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "3.4.3"
    }
  }

  required_version = ">= 1.1.0"
}

resource "random_pet" "my-pet" {
  length = 4
  separator = "_"
}
