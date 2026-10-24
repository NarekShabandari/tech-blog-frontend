# Haylog — Blog Frontend

A blog frontend built with Next.js 16, React 19, and Tailwind CSS v4. Supports dark/light theme switching, syntax-highlighted Markdown posts, and tag-based filtering. Connects to a separate REST API backend.

## Tech Stack

| Area               | Library / Tool                               |
| ------------------ | -------------------------------------------- |
| Framework          | Next.js 16 (App Router)                      |
| UI                 | React 19, Tailwind CSS v4, Lucide React      |
| State management   | Redux Toolkit + React Redux                  |
| Data fetching      | TanStack React Query v5 + Axios              |
| Markdown rendering | react-markdown, rehype-highlight, remark-gfm |
| Fonts              | Space Grotesk, JetBrains Mono                |
| Images             | Next.js Image (Cloudinary remote patterns)   |
| Sitemap            | next-sitemap                                 |
| Unit tests         | Jest 30 + Testing Library                    |
| E2E tests          | Playwright                                   |
| Analytics          | Umami (optional, self-hosted)                |

## Pages

| Route          | Description                                          |
| -------------- | ---------------------------------------------------- |
| `/`            | Blog post grid (home)                                |
| `/blog/[slug]` | Individual blog post (Markdown, syntax highlighting) |
| `/about`       | About page                                           |
| `/login`       | Authentication page                                  |

## Getting Started

### Prerequisites

- Node.js 20+
- A running backend API (set via `NEXT_PUBLIC_API_URL`)

### Environment variables

Create a `.env.local` file in the project root:

```env
# Required — URL of the backend REST API
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional — Umami analytics (self-hosted)
# NEXT_PUBLIC_UMAMI_URL=https://your-umami-instance.com
# NEXT_PUBLIC_UMAMI_ID=your-website-id
```

### Install and run

```bash
npm install
npm run dev
```

The app starts at [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build          # Production build
npm run start          # Start production server
npm run lint           # ESLint
npm run test           # Unit tests (Jest)
npm run test:watch     # Jest in watch mode
npm run test:coverage  # Jest with coverage report
npm run test:e2e       # Playwright end-to-end tests
npm run test:e2e:ui    # Playwright with interactive UI
```

## Project Structure

```
blog-frontend/
├── app/
│   ├── layout.tsx              # Root layout (fonts, analytics, Header, Footer, Providers)
│   ├── page.tsx                # Home — blog grid
│   ├── blog/[slug]/            # Blog post page
│   ├── about/                  # About page
│   ├── dashboard/              # Author dashboard
│   └── login/                  # Login page
├── components/
│   ├── blog/                   # BlogCard, BlogGrid, BlogPostClient
│   ├── layout/                 # Header, Footer, MainSection
│   └── ui/                     # Button, Card, Input, ThemeToggle, Logo
├── hooks/
│   └── queries/                # useAuth, useLogin, usePosts, useTags
├── store/                      # Redux store + authSlice
├── providers/                  # Redux + React Query provider composition
├── e2e/                        # Playwright e2e specs
└── __tests__/                  # Jest unit tests
```

## Deployment

### Docker

```bash
# Build and run with Docker Compose
docker compose up --build
```

The container is exposed on port **3002** on the host and reads environment variables from `.env.production`.

### CI/CD

GitHub Actions (`.github/workflows/deploy.yml`) automatically deploys on every push to `main` by SSHing into the server and running a deploy script. Required repository secrets:

- `SSH_HOST`
- `SSH_USER`
- `SSH_PRIVATE_KEY`

## License

This project does not currently have a license. If you intend to use or distribute it, please check with the author first.
