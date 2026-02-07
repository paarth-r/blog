export type ProjectUpdate = {
  /** ISO date or YYYY-MM-DD */
  date: string
  /** Short update text; supports **bold** and [text](url) */
  text: string
}

export type Project = {
  id: string
  title: string
  description: string
  href?: string
  year?: string
  tech?: string[]
  featured?: boolean
  /**
   * Project page hero image.
   * - Local: add the file to `public/images/<id>.png` (e.g. jarvis.png) and set image: '/images/jarvis.png'
   * - Remote: set image: 'https://...' to use an external URL.
   * See public/images/README.md for the list of expected filenames.
   */
  image?: string
  /** Article/abstract/readme for the project page */
  abstract?: string
  /** GitHub repo "owner/repo" for link and version history */
  githubRepo?: string
  /** Feed-style updates for the project page sidebar */
  updates?: ProjectUpdate[]
}

export const projects: Project[] = [
  {
    id: 'jarvis',
    title: 'JARVIS-style assistant',
    description:
      'Voice + gesture-aware assistant: 3D hand pose estimation, AR, and edge AI for controlling devices and interfaces without touching a screen.',
    href: 'https://github.com/paarth-r/jarvis',
    year: '2025',
    tech: ['Python', 'MediaPipe', 'Whisper', 'OpenXR', 'TCNN', 'RAG'],
    featured: true,
    image: '/images/jarvis.png',
    githubRepo: 'paarth-r/jarvis',
    abstract: `A modular assistant that fuses **voice commands** with **real-time 3D hand pose estimation** to interact with digital interfaces—controlling smart devices, launching scripts, or manipulating AR objects without touching a screen.

The stack uses MediaPipe Hands with monocular 3D lifting for lightweight inference, transformers for temporal stability, and OpenXR/WebXR for cross-platform AR. Voice is handled via OpenAI Whisper and local ASR, with a plugin framework for triggering scripts and external devices.

The goal is a real-time assistant that reacts to how you move and what you say, not just what you tap—open-sourced on GitHub as the base gesture set and UI stabilize.`,
  },
  {
    id: 'hyperform',
    title: 'Hyperform',
    description:
      'Making fitness more accessible with computer vision—pose estimation and form feedback for at-home workouts.',
    href: 'https://hyperformfit.com',
    year: '2024 - Ongoing',
    tech: ['CV', 'Pose estimation', 'React', 'SoTA Applied', 'AWS', 'Firebase'],
    featured: true,
    image: '/images/hyperform.png',
    updates: [
      { date: '2025-02-01', text: 'Shipped new form cues and improved pose stability on mobile.' },
      { date: '2025-01-15', text: 'Added support for multiple camera angles—feedback now adapts to device orientation.' },
      { date: '2024-12-10', text: 'Finished product and launched a website at [hyperformfit.com](https://hyperformfit.com). Early focus on lower-body movements.' },
    ],
    abstract: `**Hyperform** uses computer vision to make fitness more accessible: real-time pose estimation and form feedback for at-home workouts.

We apply state-of-the-art pose models to analyze movement and give users actionable cues—so they can train safely and effectively without a coach in the room. The product combines a React front end with cloud-backed CV pipelines (AWS) and Firebase for auth and data.

Ongoing work focuses on robustness across body types and environments, and on expanding the movement library. Live at [hyperformfit.com](https://hyperformfit.com).`,
  },
  {
    id: 'odin',
    title: 'Odin',
    description:
      'A macOS notch utility that turns your MacBook notch into a control center: media control, calendar, AI chat, file shelf, and system monitoring.',
    href: 'https://github.com/paarth-r/odin',
    year: '2025',
    tech: ['Swift', 'SwiftUI', 'macOS', 'Claude', 'Replicate'],
    featured: false,
    image: '/images/odin.png',
    githubRepo: 'paarth-r/odin',
    abstract: `**Odin** (odinv2) is a macOS utility that transforms your MacBook's notch into an interactive control center. Built with Swift and SwiftUI, it provides media control (Apple Music, Spotify, YouTube Music), calendar integration, **AI chat** powered by Claude via Replicate, a file shelf with AirDrop, and system monitoring—all from the menu bar.

Hover to expand, swipe to open or close, and customize gestures and appearance. Chat history is stored locally; no telemetry. Requires macOS 14 Sonoma or later and a notch-equipped MacBook. Based on the [boring.notch](https://github.com/TheBoredTeam/boring-notch) foundation; open source under GPL-3.0.`,
  },
  {
    id: 'blog',
    title: 'Blog',
    description:
      'This site: personal blog and project portfolio built with Next.js and MDX. Live at paarth-r.vercel.app.',
    href: 'https://github.com/paarth-r/blog',
    year: '2025',
    tech: ['Next.js', 'MDX', 'TypeScript', 'Vercel'],
    featured: false,
    githubRepo: 'paarth-r/blog',
    abstract: `This **blog and portfolio** is the site you're on—[paarth-r.vercel.app](https://paarth-r.vercel.app). Built with **Next.js**, **MDX** for posts, and deployed on Vercel.

It includes the main blog with a CV research timeline, project pages with GitHub version history and updates feeds, and a simple home page with featured projects and recent posts. Source on [GitHub](https://github.com/paarth-r/blog).`,
  },
  // {
  //   id: 'pose-lifting',
  //   title: '3D pose & motion',
  //   description:
  //     'Monocular 3D pose lifting and temporal smoothing for gesture and full-body motion—state-space and transformer-based pipelines.',
  //   year: '2025',
  //   tech: ['PyTorch', 'Transformers', 'Motion priors'],
  //   featured: false,
  // },
  // {
  //   id: 'cv-research',
  //   title: 'CV research timeline',
  //   description:
  //     'Ongoing notes and posts tracking computer vision research: ICCV, arXiv, benchmarks, and deployment (efficiency, robustness, VLMs).',
  //   href: '/blog',
  //   year: '2025–2026',
  //   tech: ['Research/Publications', 'Academic Writing'],
  //   featured: false,
  // },
]

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.id === slug)
}
