# 🎨 Thumbnail Generator

AI-powered YouTube Thumbnail Generator with Free and Pro modes.

## Features

### Free Mode
- 📝 Video Title (30 characters)
- 📄 Description (200 characters)
- 🖼️ Image Source: Generate / Upload / YouTube
- 🎭 22 Visual Styles

### Pro Mode (FREE for everyone!)
- 🌆 60+ Backgrounds in 6 categories
- 🎨 18 Custom Colors (max 3)
- 🔤 6 Fonts with 3 sizes
- 📈 15 Viral Formats
- 👤 12 Character Types with customization

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Deployment

### Option 1: Standalone Build

```bash
# Build for production
bun run build

# Start production server
bun run start
```

### Option 2: Docker

```bash
# Build Docker image
bun run docker:build

# Run container
bun run docker:run

# Or use Docker Compose
bun run docker:compose
```

### Option 3: Docker Compose with Nginx

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run lint:fix` | Fix ESLint errors |
| `bun run typecheck` | TypeScript check |
| `bun run docker:build` | Build Docker image |
| `bun run docker:run` | Run Docker container |
| `bun run docker:compose` | Start with Docker Compose |

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **UI**: shadcn/ui (Radix UI)
- **AI**: z-ai-web-dev-sdk
- **Runtime**: Bun

## License

MIT
