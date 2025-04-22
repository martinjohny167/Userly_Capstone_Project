# Final Capstone Project - DevOps Full-Stack Deployment

## 📌 Project Overview

This capstone project is a comprehensive DevOps implementation for deploying a full-stack user management application. It includes:

- React frontend
- Node.js + Express backend 
- MySQL database
- Docker containerization
- GitHub Actions CI/CD
- Deployment on AWS EC2

The goal is to create a scalable, secure, and repeatable deployment process.

---

## 🧱 Application Architecture

### 🖥 Frontend
- Built with React (`/frontend`)
- Handles UI for login, signup, and profile management
- Connects to backend via REST APIs

### 🧪 Backend
- Node.js + Express (`/backend`)
- RESTful API for user operations
- Auth + CRUD + DB interactions

### 💾 Database
- MySQL, schema in `/backend/schema.sql`
- Connected via Sequelize or raw queries

### 📦 Docker
- Each service has its own Dockerfile
- Orchestrated using `docker-compose.yml`

### ☁️ Infrastructure
- Hosted on AWS EC2
- Automated setup with `setup-ec2.sh`, `deploy.sh`

---

## 🔁 CI/CD Pipeline

CI/CD is powered by GitHub Actions.

### Workflow: `.github/workflows/deploy.yml`

**Stages:**
1. Checkout code
2. Install dependencies
3. Build Docker images
4. (Optional) Run backend unit tests
5. SCP files to EC2
6. SSH into EC2 and redeploy via Docker Compose

**Secrets Required:**
- `SSH_PRIVATE_KEY`
- `EC2_HOST`
- `EC2_USER`

---

## 🐳 Docker & Compose

- Individual Dockerfiles for frontend/backend
- Compose handles:
  - Networking
  - Port binding
  - Volume management
- Production & local parity ensured

---

## ☁️ Infrastructure

**AWS EC2**
- Runs Dockerized app
- Secured via SSH key pair
- NGINX optional for reverse proxy

**Scripts**
- `setup-ec2.sh` — install Docker, setup server
- `deploy.sh` — pull code, restart containers

---

## ⚙️ GitHub Actions Details

- Trigger: Push to `main`
- Uses `appleboy/ssh-action` and `scp-action` for remote deployment
- Fully automated deployment via GitHub CI/CD

---

## 🛠️ Challenges & Fixes

| Problem | Solution |
|--------|----------|
| SSH key denied | Set correct `.pem` file permissions |
| Port conflicts | Updated Compose file to avoid clashes |
| Node version mismatch | Used `nvm` to align versions |
| GitHub Secrets issues | Used base64 encoding and verified names |
| Docker cache issues | Forced `--no-cache` builds |

---

## ✅ Conclusion

This project demonstrates real-world DevOps workflows:
- Containerization for consistency
- GitHub Actions for CI/CD
- AWS EC2 for scalable hosting
- Full automation for delivery

### 🧰 Tech Stack
React • Node.js • MySQL • Docker • GitHub Actions • AWS EC2

### 📁 Repo Structure
- `/frontend` – React App
- `/backend` – Express API
- `/scripts` – EC2 setup + deployment
- `.github/workflows` – CI/CD config

---


