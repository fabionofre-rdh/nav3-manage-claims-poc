# =============================================================================
# RDHNav React Web Application
# =============================================================================
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./

# Install all dependencies
RUN npm ci

# Install serve globally for serving static files
RUN npm install -g serve

# Copy source code
COPY . .

# Build argument for environment (dev, staging, canary, production)
ARG BUILD_MODE=production

# Build the application for the specified environment
RUN npm run build:${BUILD_MODE}

# Create non-root user for security
RUN adduser -D -H -u 1001 -s /sbin/nologin appuser && \
    chown -R appuser:appuser /app

# Use non-root user
USER appuser

# Expose port 3000
EXPOSE 3000

# Serve the built application on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]