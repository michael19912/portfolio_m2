# Hasan Ashab Portfolio

## Project Overview
A Next.js 15 portfolio website showcasing DevOps, Cloud Computing, and software development expertise. Features a modern UI with animations, project showcase, skills grid, and blog integration.

## Current Status
✅ **Successfully imported and running on Replit**
- Frontend server running on port 5000 with Next.js 15.1.0
- All dependencies installed and compiling correctly
- Workflow configured for development

## Recent Changes
- **Downgraded from Next.js 15.3.3 to 15.1.0** - Fixed bus error with Turbopack
- **Removed Turbopack from dev script** - Using standard Next.js dev server instead
- **Removed Cloudflare setupDevPlatform** - Simplified config to fix initialization errors
- **Fixed SVG attributes in Projects.tsx** - Changed kebab-case to camelCase (strokeWidth, strokeLinecap, strokeLinejoin)
- **Installed missing @tabler/icons-react** - Required by resizable-navbar component

## Project Architecture
- **Framework**: Next.js 15.1.0 with React 19
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI components
- **Animations**: Framer Motion, Motion library
- **3D Graphics**: Three.js with react-three/fiber
- **Analytics**: Vercel Analytics integrated
- **Email**: Resend for contact form
- **Icons**: Tabler Icons, React Icons

## Key Features
- Hero section with animated background
- Projects showcase with filtering by tags
- Technical skills grid
- Blog integration
- Contact form
- Responsive design
- Dark/Light theme support
- PDF viewer for resume

## Deployment Configuration
- **Target**: Autoscale deployment
- **Build**: `npm run build`
- **Run**: `npm run start`
- **Port**: 5000 (frontend)

## Known Issues
- Minor image warning for docker.webp (non-blocking, CSS scale transform)
- metadataBase not set for social images (uses localhost:5000 in dev, will be fixed on production domain)

## Next Steps for User
1. Deploy using Replit's publish feature for live URL
2. Add custom domain if desired
3. Configure environment variables for email service and analytics
