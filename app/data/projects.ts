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
  /** URL or path for project page hero image */
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
