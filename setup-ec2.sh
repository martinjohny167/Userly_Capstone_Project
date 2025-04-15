#!/bin/bash

# Update system packages
sudo dnf update -y

# Install Node.js and npm
sudo dnf install -y nodejs

# Install development tools (needed for some npm packages)
sudo dnf groupinstall -y "Development Tools"

# Install PM2 globally
sudo npm install -g pm2

# Install nginx
sudo dnf install -y nginx

# Create application directory structure
mkdir -p ~/app/frontend/build
mkdir -p ~/app/backend

# Enable and start nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Start PM2 on system boot
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user
sudo systemctl enable pm2-ec2-user

echo "EC2 setup completed successfully!" 