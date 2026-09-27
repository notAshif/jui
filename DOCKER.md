# Docker Setup for JUI

This directory contains Docker configuration files for containerizing the JUI Next.js application.

## Files

- `Dockerfile` - Multi-stage Dockerfile supporting both development and production builds
- `docker-compose.yml` - Docker Compose configuration for easy service management
- `.dockerignore` - Files to exclude from Docker build context
- `.env.example` - Example environment variables template

## Usage

### Development

To run the development environment with hot reload:

```bash
docker-compose up dev
```

This will:
- Build the development Docker image
- Mount your local files for hot reload
- Start the Next.js dev server on port 3000
- Enable hot module replacement

### Production

To run the production-optimized build:

```bash
docker-compose up prod --build
```

This will:
- Build the production Docker image
- Create an optimized Next.js standalone build
- Run the production server on port 3000
- Enable automatic restarts

### Build Only

To build images without running them:

```bash
# Development image
docker-compose build dev

# Production image
docker-compose build prod
```

### Stop Services

```bash
docker-compose down
```

## Docker Stages

The Dockerfile uses multi-stage builds:

1. **base** - Sets up the base Bun environment
2. **deps** - Installs dependencies (cached)
3. **dev** - Development stage with hot reload
4. **builder** - Builds the Next.js application
5. **runner** - Production-optimized runtime

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure as needed:

```bash
cp .env.example .env
```

### Port Configuration

To change the exposed port, modify the `ports` section in `docker-compose.yml`:

```yaml
ports:
  - "8080:3000"  # Maps host port 8080 to container port 3000
```

## Production Deployment

For production deployment, consider:

1. Using a reverse proxy (nginx) in front of the container
2. Setting up proper health checks
3. Configuring logging and monitoring
4. Using secrets management for sensitive data
5. Implementing proper CI/CD pipeline

## Troubleshooting

### Build Issues

If you encounter build issues, try:

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Volume Issues

If hot reload isn't working, check volume mounts:

```bash
docker-compose down -v
docker-compose up dev
```

### Port Conflicts

If port 3000 is already in use, change the port mapping in `docker-compose.yml`.
