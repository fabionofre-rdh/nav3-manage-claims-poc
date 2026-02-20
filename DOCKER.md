# Docker Deployment Guide

This guide explains how to build and deploy the RDHNav React Web Application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)
- Environment-specific `.env` files (`.env.dev`, `.env.staging`, `.env.production`)

## Quick Start

### Environment-Specific Commands

Each environment (dev, staging, production) has its own set of commands:

#### DEV Environment

```bash
# Build
npm run docker:build:dev

# Run with docker compose
npm run docker:up:dev

# View logs
npm run docker:logs:dev

# Rebuild
npm run docker:rebuild:dev
```

#### STAGING Environment

```bash
# Build
npm run docker:build:staging

# Run with docker compose
npm run docker:up:staging

# View logs
npm run docker:logs:staging

# Rebuild
npm run docker:rebuild:staging
```

#### PRODUCTION Environment

```bash
# Build
npm run docker:build:production

# Run with docker compose
npm run docker:up:production

# View logs
npm run docker:logs:production

# Rebuild
npm run docker:rebuild:production
```

#### Stop Any Environment

```bash
npm run docker:down
```

## Accessing the Web Application

Once the container is running, access the web application at:

- **http://localhost:3000**

## Environment Variables

### Environment Files

Create separate `.env` files for each environment:

```bash
.env.dev          # Development environment
.env.staging      # Staging environment
.env.production   # Production environment
```

Example `.env.dev` file:

```env
VITE_NODE_ENV=development
VITE_API_BASE=https://dev-api.your-domain.com/api
VITE_MSAL_CLIENT_ID=your_dev_azure_client_id
VITE_MSAL_AUTHORITY_ID=your_azure_tenant_id
VITE_MSAL_REDIRECT_URI=https://dev.your-domain.com
VITE_LEGACY_API_BASE=https://dev-api.your-domain.com
VITE_ENABLED_MODULES=module1|module2|module3
```

Example `.env.staging` file:

```env
VITE_NODE_ENV=staging
VITE_API_BASE=https://staging-api.your-domain.com/api
VITE_MSAL_CLIENT_ID=your_staging_azure_client_id
VITE_MSAL_AUTHORITY_ID=your_azure_tenant_id
VITE_MSAL_REDIRECT_URI=https://staging.your-domain.com
VITE_LEGACY_API_BASE=https://staging-api.your-domain.com
VITE_ENABLED_MODULES=module1|module2|module3
```

Example `.env.production` file:

```env
VITE_NODE_ENV=production
VITE_API_BASE=https://api.your-domain.com/api
VITE_MSAL_CLIENT_ID=your_prod_azure_client_id
VITE_MSAL_AUTHORITY_ID=your_azure_tenant_id
VITE_MSAL_REDIRECT_URI=https://your-domain.com
VITE_LEGACY_API_BASE=https://api.your-domain.com
VITE_ENABLED_MODULES=module1|module2|module3
```

## Build Modes

The Dockerfile accepts a `BUILD_MODE` argument that tells Vite which environment to build for:

| BUILD_MODE | Vite Mode  | npm script                 | Description       |
| ---------- | ---------- | -------------------------- | ----------------- |
| dev        | dev        | `npm run build:dev`        | Development build |
| staging    | staging    | `npm run build:staging`    | Staging build     |
| production | production | `npm run build:production` | Production build  |

When building Docker images, the `BUILD_MODE` is passed as a build argument:

```bash
# This runs: npm run build:dev inside the container
docker build --build-arg BUILD_MODE=dev -t rdh-ai-agent-react-webapp:dev .

# This runs: npm run build:staging inside the container
docker build --build-arg BUILD_MODE=staging -t rdh-ai-agent-react-webapp:staging .

# This runs: npm run build:production inside the container
docker build --build-arg BUILD_MODE=production -t rdh-ai-agent-react-webapp:production .
```

## Docker Image Details

The Docker image:

- **Base**: `node:22-alpine`
- Installs all dependencies
- Runs the Vite build process with the specified `BUILD_MODE`
- Uses `serve` package to serve static files on port 3000
- Runs as non-root user for security

## Port Configuration

By default, all environments expose port `3000`. To change the host port:

```bash
# Run on a different host port
docker run -p 8080:3000 rdh-ai-agent-react-webapp:dev
```

## Azure Container Apps (ACA) Deployment

See `.github/workflows/` for environment-specific deployment workflows:

- `deploy-dev.yml` - Deploy to DEV environment
- `deploy-staging.yml` - Deploy to STAGING environment
- `deploy-production.yml` - Deploy to PRODUCTION environment

All workflows use `workflow_dispatch` for manual triggering.

### Manual ACA Deployment

```bash
# Login to Azure
az login

# Login to ACR
az acr login --name yourregistry

# Build and push for specific environment
docker build --build-arg BUILD_MODE=staging -t yourregistry.azurecr.io/rdh-ai-agent-react-webapp:staging .
docker push yourregistry.azurecr.io/rdh-ai-agent-react-webapp:staging

# Update Container App
az containerapp update \
  --name rdhnav-webapp-staging \
  --resource-group your-rg \
  --image yourregistry.azurecr.io/rdh-ai-agent-react-webapp:staging
```

## Troubleshooting

### Build Issues

```bash
# Clean Docker cache and rebuild for specific environment
docker compose down -v
docker system prune -f
npm run docker:rebuild:staging
```

### Container Not Starting

Check logs for detailed error messages:

```bash
npm run docker:logs:dev
npm run docker:logs:staging
npm run docker:logs:production
```

### SPA Routing Issues

The `serve` package handles SPA routing with the `-s` flag, which serves `index.html` for all routes.

### Environment Variables Not Working

Remember that Vite embeds environment variables at build time. The `.env.{environment}` file must be present before building the Docker image.

## Advanced Usage

### Interactive Shell

```bash
docker exec -it rdh-ai-agent-react-webapp-dev sh
docker exec -it rdh-ai-agent-react-webapp-staging sh
docker exec -it rdh-ai-agent-react-webapp-production sh
```