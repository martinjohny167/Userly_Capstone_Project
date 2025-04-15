#!/bin/bash

# Configuration
HOST="$1"
KEY_FILE="deploy-key.pem"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo_success() {
    echo -e "${GREEN}$1${NC}"
}

echo_error() {
    echo -e "${RED}$1${NC}"
}

# Stage 1: Setup SSH key and test connection
setup_ssh() {
    # Check if key file exists
    if [[ ! -f $KEY_FILE ]]; then
        echo_error "Error: $KEY_FILE not found"
        exit 1
    fi

    # Set correct permissions
    chmod 600 $KEY_FILE

    # Test SSH connection
    echo "Testing SSH connection..."
    if ssh -i $KEY_FILE -o StrictHostKeyChecking=no ec2-user@$HOST 'echo "SSH connection successful"'; then
        echo_success "SSH connection established successfully"
    else
        echo_error "SSH connection failed"
        exit 1
    fi
}

# Stage 2: Create directory structure
create_directories() {
    echo "Creating directory structure..."
    ssh -i $KEY_FILE ec2-user@$HOST '
        mkdir -p ~/app/frontend/build
        mkdir -p ~/app/backend
    '
    echo_success "Directories created successfully"
}

# Stage 3: Copy frontend files
deploy_frontend() {
    echo "Deploying frontend..."
    if scp -i $KEY_FILE -r frontend/build/* ec2-user@$HOST:~/app/frontend/build/; then
        echo_success "Frontend deployed successfully"
    else
        echo_error "Frontend deployment failed"
        exit 1
    fi
}

# Stage 4: Copy backend files
deploy_backend() {
    echo "Deploying backend..."
    if scp -i $KEY_FILE -r backend/* ec2-user@$HOST:~/app/backend/; then
        echo_success "Backend deployed successfully"
    else
        echo_error "Backend deployment failed"
        exit 1
    fi
}

# Stage 5: Configure and start services
configure_services() {
    echo "Configuring services..."
    ssh -i $KEY_FILE ec2-user@$HOST '
        # Install Node.js
        if ! command -v node &> /dev/null; then
            curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
            sudo yum install -y nodejs
        fi

        # Install PM2
        if ! command -v pm2 &> /dev/null; then
            sudo npm install -g pm2
        fi

        # Start backend
        cd ~/app/backend
        npm ci --production
        pm2 delete backend || true
        pm2 start server.js --name backend

        # Install and configure Nginx
        if ! command -v nginx &> /dev/null; then
            sudo yum install -y nginx
        fi

        # Configure Nginx
        sudo tee /etc/nginx/nginx.conf << EOL
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;
    
    server {
        listen       80;
        server_name  _;
        root         /home/ec2-user/app/frontend/build;

        location / {
            try_files \$uri \$uri/ /index.html;
        }

        location /api/ {
            proxy_pass http://localhost:5000/;
            proxy_http_version 1.1;
            proxy_set_header Host \$host;
            proxy_cache_bypass \$http_upgrade;
        }
    }
}
EOL

        # Start Nginx
        sudo systemctl enable nginx
        sudo systemctl restart nginx
        sudo setsebool -P httpd_can_network_connect 1
    '
    echo_success "Services configured successfully"
}

# Main deployment script
case "$2" in
    "ssh")
        setup_ssh
        ;;
    "dirs")
        create_directories
        ;;
    "frontend")
        deploy_frontend
        ;;
    "backend")
        deploy_backend
        ;;
    "services")
        configure_services
        ;;
    "all")
        setup_ssh
        create_directories
        deploy_frontend
        deploy_backend
        configure_services
        echo_success "Full deployment completed successfully"
        ;;
    *)
        echo "Usage: $0 <host> <stage>"
        echo "Stages: ssh, dirs, frontend, backend, services, all"
        exit 1
        ;;
esac 