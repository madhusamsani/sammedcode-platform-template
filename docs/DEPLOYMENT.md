# Deployment Guide

This guide covers deploying the SammedCode Platform Template to various environments.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Deployment Options](#deployment-options)
- [Docker Deployment](#docker-deployment)
- [Cloud Platforms](#cloud-platforms)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring and Logging](#monitoring-and-logging)
- [Security Checklist](#security-checklist)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

### Required Accounts/Services

- **Docker Hub** or container registry account
- **Cloud Provider** account (AWS/GCP/Azure/DigitalOcean)
- **Database** instance (PostgreSQL)
- **Domain name** (optional, for production)

### Required Tools

- Docker (v20+)
- Docker Compose (v2+)
- kubectl (for Kubernetes deployments)
- Cloud provider CLI tools

## 🔐 Environment Configuration

### Environment Variables

Create a `.env.production` file with production values:

```bash
# Application
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@db.example.com:5432/dbname

# Security
JWT_SECRET=your-production-secret-minimum-32-characters
SESSION_SECRET=your-session-secret-minimum-32-characters

# API
API_URL=https://api.yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com

# External Services
# Add your production service credentials
```

### Security Best Practices

1. **Never commit secrets to Git**
2. **Use environment-specific values**
3. **Rotate secrets regularly**
4. **Use secrets management services** (AWS Secrets Manager, Azure Key Vault, etc.)
5. **Encrypt sensitive data at rest**

## 🚀 Deployment Options

### Option 1: Traditional Server

Deploy to a VPS or dedicated server:

1. SSH into your server
2. Install Node.js, PostgreSQL, and Nginx
3. Clone repository
4. Install dependencies
5. Build application
6. Configure Nginx as reverse proxy
7. Set up PM2 for process management

### Option 2: Docker Deployment

Use Docker for containerized deployment:

1. Build Docker images
2. Push to container registry
3. Pull and run on server
4. Use Docker Compose for orchestration

### Option 3: Kubernetes

Deploy to Kubernetes cluster:

1. Create Kubernetes manifests
2. Set up ConfigMaps and Secrets
3. Deploy to cluster
4. Configure Ingress for routing

### Option 4: Platform as a Service (PaaS)

Deploy to managed platforms:

- **Heroku**
- **Vercel** (frontend)
- **Railway**
- **Render**
- **Fly.io**

## 🐳 Docker Deployment

### Build Docker Images

```bash
# Build all images
docker-compose build

# Build specific service
docker build -t sammedcode-frontend ./apps/frontend
docker build -t sammedcode-backend ./apps/backend
```

### Push to Registry

```bash
# Tag images
docker tag sammedcode-frontend:latest username/sammedcode-frontend:latest
docker tag sammedcode-backend:latest username/sammedcode-backend:latest

# Push to Docker Hub
docker push username/sammedcode-frontend:latest
docker push username/sammedcode-backend:latest
```

### Deploy with Docker Compose

```bash
# Production docker-compose file
version: '3.8'

services:
  frontend:
    image: username/sammedcode-frontend:latest
    ports:
      - "80:3000"
    environment:
      - NODE_ENV=production
      - API_URL=http://backend:4000
    depends_on:
      - backend

  backend:
    image: username/sammedcode-backend:latest
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

## ☁️ Cloud Platforms

### AWS Deployment

#### Using EC2

1. **Launch EC2 Instance**
   ```bash
   # Ubuntu 22.04 LTS
   # t3.medium or larger
   ```

2. **Install Docker**
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose
   ```

3. **Deploy Application**
   ```bash
   git clone repo
   cd repo
   docker-compose up -d
   ```

4. **Configure Security Groups**
   - Allow HTTP (80)
   - Allow HTTPS (443)
   - Allow SSH (22) from your IP

#### Using ECS (Elastic Container Service)

1. Create ECS cluster
2. Define task definitions
3. Create services
4. Configure load balancer

#### Using RDS for Database

```bash
# Create PostgreSQL RDS instance
aws rds create-db-instance \
  --db-instance-identifier sammedcode-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password yourpassword \
  --allocated-storage 20
```

### Google Cloud Platform (GCP)

#### Using Cloud Run

```bash
# Build and push image
gcloud builds submit --tag gcr.io/PROJECT_ID/sammedcode-backend

# Deploy to Cloud Run
gcloud run deploy sammedcode-backend \
  --image gcr.io/PROJECT_ID/sammedcode-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Using Compute Engine

Similar to EC2 deployment

#### Using Cloud SQL

```bash
# Create PostgreSQL instance
gcloud sql instances create sammedcode-db \
  --database-version=POSTGRES_14 \
  --tier=db-f1-micro \
  --region=us-central1
```

### Microsoft Azure

#### Using App Service

```bash
# Create resource group
az group create --name sammedcode-rg --location eastus

# Create App Service plan
az appservice plan create \
  --name sammedcode-plan \
  --resource-group sammedcode-rg \
  --sku B1 \
  --is-linux

# Create web app
az webapp create \
  --name sammedcode-app \
  --resource-group sammedcode-rg \
  --plan sammedcode-plan \
  --runtime "NODE|18-lts"
```

#### Using Azure Database for PostgreSQL

```bash
az postgres server create \
  --resource-group sammedcode-rg \
  --name sammedcode-db \
  --location eastus \
  --admin-user adminuser \
  --admin-password yourpassword \
  --sku-name B_Gen5_1
```

### DigitalOcean

#### Using App Platform

1. Connect GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy

#### Using Droplets

Similar to EC2 deployment

## 🔄 CI/CD Pipeline

### GitHub Actions (Included)

The template includes a GitHub Actions workflow (`.github/workflows/ci.yml`):

1. **Lint** - Checks code quality
2. **Test** - Runs test suite
3. **Build** - Builds applications
4. **Docker** - Builds and pushes Docker images

### Continuous Deployment

Add deployment step to workflow:

```yaml
deploy:
  name: Deploy to Production
  runs-on: ubuntu-latest
  needs: [docker]
  if: github.ref == 'refs/heads/main'
  steps:
    - name: Deploy to server
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /app
          docker-compose pull
          docker-compose up -d
```

## 📊 Monitoring and Logging

### Application Monitoring

#### Using PM2 (for Node.js)

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start dist/index.js --name sammedcode-backend

# Monitor
pm2 monit

# View logs
pm2 logs
```

#### Using Prometheus + Grafana

1. Set up Prometheus to scrape metrics
2. Configure Grafana dashboards
3. Set up alerts

### Log Aggregation

#### Using ELK Stack (Elasticsearch, Logstash, Kibana)

1. Configure application to output JSON logs
2. Set up Logstash to collect logs
3. Index logs in Elasticsearch
4. Visualize in Kibana

#### Using Cloud Services

- **AWS CloudWatch**
- **GCP Cloud Logging**
- **Azure Monitor**
- **Datadog**
- **New Relic**

## 🔐 Security Checklist

### Before Deployment

- [ ] Update all dependencies
- [ ] Remove development dependencies
- [ ] Set secure environment variables
- [ ] Enable HTTPS/TLS
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Configure firewall rules
- [ ] Set up backups
- [ ] Enable database encryption
- [ ] Configure secrets management
- [ ] Set up monitoring and alerts

### SSL/TLS Setup

#### Using Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal is set up automatically
```

#### Using Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🐛 Troubleshooting

### Common Issues

#### Container Won't Start

```bash
# Check logs
docker logs container-name

# Check if port is in use
netstat -tulpn | grep :3000

# Inspect container
docker inspect container-name
```

#### Database Connection Issues

```bash
# Test connection
psql -h hostname -U username -d database

# Check credentials in .env
# Verify security groups/firewall rules
```

#### High Memory Usage

```bash
# Check memory usage
docker stats

# Increase memory limit
docker run -m 512m image-name
```

### Rollback Strategy

```bash
# Keep previous version
docker tag current-version:latest current-version:backup

# Rollback if needed
docker stop container-name
docker run previous-version:backup
```

## 📈 Performance Optimization

### Database

- Enable connection pooling
- Add proper indexes
- Configure query caching
- Use read replicas

### Application

- Enable Gzip compression
- Use CDN for static assets
- Implement caching (Redis)
- Optimize images

### Infrastructure

- Use load balancer
- Enable auto-scaling
- Use CDN
- Configure caching layers

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)

## 🆘 Getting Help

If you encounter issues:
- Check logs first
- Review documentation
- Search GitHub issues
- Contact DevOps team
