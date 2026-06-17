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
    title: 'Jarvis',
    description:
      'An event-driven runtime that turns a stereo camera pair into a 3D hand interface—MediaPipe tracking triangulated to metric 3D, driving the cursor, pinch-click, and pointing.',
    href: 'https://github.com/paarth-r/jarvis',
    year: '2026',
    tech: ['Python', 'Stereo Vision', 'MediaPipe', 'asyncio', 'Triangulation'],
    featured: true,
    image: '/images/jarvis.png',
    githubRepo: 'paarth-r/jarvis',
    abstract: `**Jarvis** is a gesture-based human-computer interaction system: two stereo cameras track your hand in 3D—MediaPipe hand landmarks triangulated to metric world coordinates—and pinch gestures drive the mouse cursor, fire keyboard actions, and point/raycast at the screen. Control the computer with your hand in the air.

The architecture is **event-driven** (asyncio pub/sub on the main thread): per-camera hand-pose modules feed a stereo-fusion module, a gesture FSM, and an action dispatcher, with a live visualizer overlaying 2D keypoints and a matplotlib 3D hand skeleton. A file/video replay path lets the whole pipeline run with no rig attached, plus stereo undistortion and a pointing gesture.

Packaged, public, and documented—MIT-licensed on [GitHub](https://github.com/paarth-r/jarvis) (\`pip install -e .\` + a \`jarvis\` console command), 60 tests passing. A sibling to Hyperform: same stereo rig and MediaPipe patterns, hands instead of full body.`,
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
      { date: '2026-06-14', text: 'Designing a new full-body capture rig—portrait-mounted cameras, ~20–30 cm baseline, M12 lens—for clean tracking out to 2 m.' },
      { date: '2026-06-10', text: 'Picked **push-up** as the second exercise (over golf): it maps cleanly onto the COCO-17 pipeline as a horizontal squat. Traced the squat correction pipeline end-to-end as the template.' },
      { date: '2026-06-09', text: 'Went from stereo to a **3-camera rig**—all three calibrated (ChArUco intrinsics, ~0.3 px RMS), with an N-view confidence-weighted triangulation pipeline pushed.' },
      { date: '2026-05-31', text: 'Built the **correction engine** (~3,000 lines, 291 tests): 9 body metrics, a phase state machine, 5 rule types (angle/symmetry/trajectory/tempo/DTW), streaming over WebSocket. Exercises are markdown specs—add one with no code.' },
    ],
    abstract: `**Hyperform** uses computer vision to make fitness more accessible: real-time 3D pose estimation and form feedback for at-home and in-gym workouts.

A synchronized multi-camera rig (now three calibrated cameras) reconstructs a 17-keypoint 3D skeleton in metric space at up to 120 fps via N-view triangulation. On top sits a **correction engine** that evaluates body metrics against per-exercise rules—angle, symmetry, trajectory, tempo, and DTW—and streams live form cues to a React Native (Expo) kiosk over WebSocket. Exercises are markdown specs with YAML frontmatter, so adding a movement means writing a file, not code.

Solo-built across vision, hardware, and app. Pre-revenue and raising a first round; live at [hyperformfit.com](https://hyperformfit.com).`,
  },
  {
    id: 'dum-e',
    title: 'dum-e',
    description:
      'A jitter-free, Xbox-driven inverse-kinematics controller for the LeRobot SO-101 arm—plus a PyBullet sim rig and a diffusion-policy imitation-learning scaffold.',
    href: 'https://github.com/paarth-r/Dum-E',
    year: '2026',
    tech: ['Python', 'Robotics', 'IK', 'PyBullet', 'placo'],
    featured: true,
    githubRepo: 'paarth-r/Dum-E',
    abstract: `**dum-e** is a library and CLI for controlling a [LeRobot SO-101](https://github.com/huggingface/lerobot) arm—a 5-DOF, ~$100 hobby arm—with an Xbox controller. Named after the clumsy robot arm from the Iron Man workshop.

The interesting problem wasn't the IK, it was making teleop *feel good*. Reading noisy servo encoders straight back into the control loop makes the arm buzz and chase a jittering target. The fix (the same one Stanford's TidyBot++ uses): never track measured feedback—maintain an internal **commanded reference** \`q_ref\` and integrate all motion from that, using damped-least-squares IK plus a jerk cap. The result is teleop that feels connected instead of twitchy.

On top sits an interactive **PyBullet sim** (Xbox + keyboard, a grabbable box, OnShape-style orbit/pan navigation) with a synthetic depth camera for hardware-free testing, plus the scaffolding for a TidyBot++-style **diffusion-policy imitation-learning** pipeline. Live on real hardware and pushed to [GitHub](https://github.com/paarth-r/Dum-E).`,
  },
  {
    id: 'campus',
    title: 'Campus',
    description:
      'A single-file browser climbing game: webcam-pose or mouse control, a Verlet-ragdoll climber with bending limbs, stamina, and full persistent progression.',
    href: 'https://paarth-r.github.io/Campus',
    year: '2026',
    tech: ['JavaScript', 'Canvas', 'MediaPipe', 'Game Physics'],
    featured: false,
    githubRepo: 'paarth-r/Campus',
    abstract: `**Campus** is a browser climbing game built into a single \`index.html\`—no build step, [live on GitHub Pages](https://paarth-r.github.io/Campus). Reach for glowing holds and climb a scrolling wall as a physically-credible **Verlet ragdoll** with two-bone bending arms and legs; falls are caught by the rope at your last clipped quickdraw.

Two control modes: **Campus** uses webcam pose (hands only, feet dangle—a hand grabs when its on-screen marker overlaps a hold), and **Klifur** is a pure mouse puzzle where you drag each limb onto holds. The mechanic is tuned for real climbing feel: input-gated leg drive, precision overlap-only grabs, a BotW-style stamina wheel that drains only while you're actively moving to a new hold.

On top of the physics sits a full progression loop—a persistent profile with four skills (Grip, Endurance, Fingers, Reach) that literally feed the mechanic, V-graded routes with a soft skill gate, an economy, and a level editor with a draggable reference climber. Grades cap at V17, with a "really bro?" easter egg above V10.`,
  },
  {
    id: 'flowstate',
    title: 'Flowstate',
    description:
      'A focus app designed to fix attention spans through incentivization, gamification, and a strict five-minute daily limit. Launch soon.',
    year: '2025',
    tech: ['React Native', 'Supabase', 'Stripe', 'Productivity'],
    featured: true,
    abstract: `**Flowstate** is a focus app built to repair attention spans. It uses **incentivization** and **gamification** to make deep work rewarding—and you can only use it for **five minutes a day**.
That's all it needs. Launch soon.`,
    updates: [
      { date: '2025-02-05', text: 'Flowstate in development—launch soon.' },
    ],
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
    featured: true,
    image: '/images/blog.png',
    githubRepo: 'paarth-r/blog',
    abstract: `This **blog and portfolio** is the site you're on—[paarth-r.vercel.app](https://paarth-r.vercel.app). Built with **Next.js**, **MDX** for posts, and deployed on Vercel.

It includes the main blog with a CV research timeline, project pages with GitHub version history and updates feeds, and a simple home page with featured projects and recent posts. Source on [GitHub](https://github.com/paarth-r/blog).`,
  },
  {
    id: 'impostor',
    title: 'Impostor',
    description:
      'A local party game: one word, one hint, one impostor. Everyone else knows the word; the impostor only sees the hint. Discuss and vote to find the impostor.',
    href: 'https://github.com/paarth-r/impostor',
    year: '2025',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    featured: false,
    githubRepo: 'paarth-r/impostor',
    abstract: `**Impostor** is a local party game I built for friends—inspired by the viral "impostor game." One word, one hint, one impostor: everyone but the impostor sees the word; the impostor only sees the hint. Players discuss and vote to find the impostor.

Run it locally: \`npm install\` and \`npm run dev\`. The server listens on localhost and your local IP so phones and other devices on the same Wi‑Fi can join. The host uses the admin panel (localhost only) to set the word and hint, assign the impostor, start the round, then run voting or reveal. Game state is in-memory, so a server restart or **Reset game** clears everyone; players can rejoin. Source on [GitHub](https://github.com/paarth-r/impostor).`,
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
