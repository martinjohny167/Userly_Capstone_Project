
variable "region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  default     = "t2.micro"
}

variable "key_name" {
  description = "SSH key name"
  default     = "deployer-key"
}

variable "public_key_path" {
  description = "Path to SSH public key"
  default     = "~/.ssh/id_rsa.pub"
}
