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
    id: 'metanoia',
    title: 'Metanoia',
    description:
      'A social goal-tracking app built around a 30-day reset: daily non-negotiables, weekly targets, friends and groups, a live feed of ticks. Web + iOS on one Supabase backend.',
    href: 'https://paarth-r.github.io/metanoia',
    year: '2026',
    tech: ['React Native', 'Expo', 'Supabase', 'Postgres RLS', 'PWA'],
    featured: true,
    githubRepo: 'paarth-r/metanoia',
    updates: [
      { date: '2026-08-30', text: 'App Store compliance built: in-app account deletion, block/report/filter moderation with a review queue, privacy policy. Email confirmation dropped in favor of one-screen signup.' },
      { date: '2026-08-29', text: 'Days calendar with daily todos on both clients. A repeating todo is one row plus one tick row per date, so history stays immutable and late ticks just work.' },
      { date: '2026-08-26', text: 'Native **React Native / Expo** app at full parity with the web, then the leather-ledger redesign, group chat with images, feed reactions, invites, and per-group silence.' },
      { date: '2026-08-25', text: 'Went from a single static page to a **multi-user Supabase app** in one day: RLS privacy tiers, friends, groups with invite codes, realtime feed, public profiles.' },
    ],
    abstract: `**Metanoia** is a habit tracker that became a social app. It started on August 25 as one static HTML file for my own 30-day reset (seven daily non-negotiables, weekly targets, a ledger that fills black on perfect days). By the end of the week it was a multi-user app: friends, groups with chat and invite codes, a realtime feed of everyone's ticks with reactions, public profiles, and a Days calendar with daily todos.

One Supabase backend sits behind the vanilla-JS web app and the React Native client. Privacy is enforced in **row-level security**, not in the clients: a plan is private, friends-only, or public, and the anonymous REST API returns exactly what a stranger may see. No service-role key ships anywhere. Account deletion, blocking, reporting, and a banned-term filter are built in for App Store review.

Live at [paarth-r.github.io/metanoia](https://paarth-r.github.io/metanoia), iOS build headed for TestFlight, source on [GitHub](https://github.com/paarth-r/metanoia).`,
  },
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
      { date: '2026-09-07', text: 'Full audit of the correction engine before rebuilding motion grading: nine findings, each cited to file and line. The biggest is that 592 tests pass and none of them answers "is this rep bad" — building the labeled corpus and harness first.' },
      { date: '2026-08-13', text: 'Kiosk restart on the real target: a 27" portrait display (1440x2560). QR download dialog shipped; BLE-proximity fast sign-in designed.' },
      { date: '2026-07-27', text: 'Rep-mechanics merged to main: motion-segmented reps with a personal baseline stage, validated on the live rig against a real bicep-curl session.' },
      { date: '2026-06-14', text: 'Designing a new full-body capture rig—portrait-mounted cameras, ~20–30 cm baseline, M12 lens—for clean tracking out to 2 m.' },
      { date: '2026-06-10', text: 'Picked **push-up** as the second exercise (over golf): it maps cleanly onto the COCO-17 pipeline as a horizontal squat. Traced the squat correction pipeline end-to-end as the template.' },
      { date: '2026-06-09', text: 'Went from stereo to a **3-camera rig**—all three calibrated (ChArUco intrinsics, ~0.3 px RMS), with an N-view confidence-weighted triangulation pipeline pushed.' },
      { date: '2026-05-31', text: 'Built the **correction engine** (~3,000 lines, 291 tests): 9 body metrics, a phase state machine, 5 rule types (angle/symmetry/trajectory/tempo/DTW), streaming over WebSocket. Exercises are markdown specs—add one with no code.' },
    ],
    abstract: `**Hyperform** uses computer vision to make fitness more accessible: real-time 3D pose estimation and form feedback for at-home and in-gym workouts.

A synchronized, ChArUco-calibrated stereo rig (two global-shutter cameras, 22° toe-in) reconstructs a 17-keypoint 3D skeleton in metric space via N-view triangulation. On top sits a **correction engine** that segments reps from motion, evaluates body metrics against per-exercise rules—angle, symmetry, trajectory, tempo, and DTW—and streams live form cues to a React Native (Expo) kiosk on a 27" portrait display over WebSocket. Exercises are markdown specs with YAML frontmatter, so adding a movement means writing a file, not code.

Solo-built across vision, hardware, and app; 592 tests on main. Current work is a labeled corpus and harness so form verdicts are measured, not assumed. Live at [hyperformfit.com](https://hyperformfit.com).`,
  },
  {
    id: 'dum-e',
    title: 'dum-e',
    description:
      'A jitter-free, Xbox-driven inverse-kinematics controller for the LeRobot SO-101 arm—turbo teleop, hand-guided macros, a PyBullet sim with emergent grasping, and a first slice of force sensing.',
    href: 'https://github.com/paarth-r/Dum-E',
    year: '2026',
    tech: ['Python', 'Robotics', 'IK', 'PyBullet', 'placo', 'Force Sensing'],
    featured: true,
    githubRepo: 'paarth-r/Dum-E',
    updates: [
      { date: '2026-09-14', text: '**Force sensing, slice 1:** gravity torques from the model, `read_loads()` on every backend, a `ForceEstimator` mapping residual load to an end-effector wrench, and `dume feel`. 219 tests; hardware calibration sweep is next. End-effector camera stack removed in favor of a fixed desk camera.' },
      { date: '2026-08-09', text: 'On-hardware teleop overhaul: 2.5x hold-RB turbo (the anti-lockout leash was the real speed cap), 1:1 gripper after clearing a stored servo velocity cap, hand-guided macros on the digit keys, latched triggers, limp-gripper toggle.' },
      { date: '2026-07-05', text: 'Physical grasp sim: the PyBullet arm is now the real backend the controller drives, and grasping is emergent from friction and bounded gripper force instead of a magnet.' },
      { date: '2026-07-01', text: 'Posture-aware IK landed: a nullspace bias toward an elbow-up rest pose fixes the full-extension fold-and-lockout that limit avoidance alone could not.' },
    ],
    abstract: `**dum-e** is a library and CLI for controlling a [LeRobot SO-101](https://github.com/huggingface/lerobot) arm—a 5-DOF, ~$100 hobby arm—with an Xbox controller. Named after the clumsy robot arm from the Iron Man workshop.

The interesting problem wasn't the IK, it was making teleop *feel good*. Reading noisy servo encoders straight back into the control loop makes the arm buzz and chase a jittering target. The fix (the same one Stanford's TidyBot++ uses): never track measured feedback—maintain an internal **commanded reference** \`q_ref\` and integrate all motion from that, using damped-least-squares IK plus a jerk cap. The result is teleop that feels connected instead of twitchy.

On top sits an interactive **PyBullet sim** (Xbox + keyboard, OnShape-style orbit/pan navigation) where the physics arm is the real backend the controller drives and grasping is emergent from friction, plus hand-guided macro recording, a 2.5x turbo, and the first slice of **force sensing**: measured servo load minus modelled gravity, mapped to an end-effector wrench. Live on real hardware, MIT-licensed, pushed to [GitHub](https://github.com/paarth-r/Dum-E).`,
  },
  {
    id: 'storepose',
    title: 'storePose',
    description:
      'Real-time store analytics for Mashgin: multi-person pose tracking, queue state, and a calibrated busy signal from ordinary store-camera video.',
    href: 'https://github.com/paarth-r/storePose',
    year: '2026',
    tech: ['Python', 'Computer Vision', 'RTMPose', 'YOLOX', 'Tracking', 'ONNX Runtime'],
    featured: true,
    githubRepo: 'paarth-r/storePose',
    updates: [
      { date: '2026-09-04', text: 'Handover closed: README branch fast-forwarded to main, final run **1,236/1,236** tests green.' },
      { date: '2026-08-11', text: 'Final demo delivered at Mashgin on the live two-camera rig, running on a Jetson AGX Orin.' },
      { date: '2026-08-07', text: 'Re-id gating overhaul deployed to the Jetson: a spawn gate for new identities, no-torso-no-ID, an absorb bar with a 30-minute TTL, and proximity-relieved re-link floors.' },
      { date: '2026-07-21', text: '**Multi-camera fusion** merged to main, with point-pick calibration across cameras.' },
      { date: '2026-07-09', text: '**Live 3D scene viewer** shipped to main: a point-cloud reconstruction of the store next to the video feed, with live floor markers.' },
      { date: '2026-06-29', text: 'Found that monocular depth reconstruction of the store floor **bows up to 0.7m at range** — not a calibration bug. Moving to a manual four-point homography for the exact-location heatmap.' },
      { date: '2026-06-25', text: 'Shipped a **BoT-SORT-style gated re-id fusion** — appearance only counts when geometry already agrees — plus an `--ignore-zone` to stop static props from stealing identities.' },
      { date: '2026-05-30', text: 'First commit: realtime multi-person pose (YOLOX + RTMPose) pipeline.' },
    ],
    abstract: `**storePose** turns ordinary store-camera video into a live answer to one operational question — how busy is the checkout line, right now? — and a measured comparison between a Mashgin self-checkout and a staffed lane.

It detects every person, fits a 17-keypoint pose, tracks each one with a stable identity through occlusions (SORT-style Kalman + IoU, One-Euro smoothing, gated appearance re-id that never overrides geometry, spawn-gated identities), fuses two cameras into one floor-plane track, and runs a per-person state machine that splits a visit into waiting and being served. From that it derives a calibrated Low/Medium/High busy signal, per-checkout service times, and a live browser dashboard — in realtime on a Jetson Orin, or on a laptop.

Built and shipped during a research placement at Mashgin. 1,236 tests passing, MIT-licensed, [on GitHub](https://github.com/paarth-r/storePose).`,
  },
  {
    id: 'claudemaxxing',
    title: 'claudemaxxing',
    description:
      "A terminal dashboard for Claude Code's rolling 5-hour usage limit — real pace math instead of a static comparison, a commit-graph-style usage heatmap, and fake philosopher quotes with LinkedIn job titles.",
    href: 'https://github.com/paarth-r/claudemaxxing',
    year: '2026',
    tech: ['Python', 'rich', 'Terminal UI'],
    featured: true,
    githubRepo: 'paarth-r/claudemaxxing',
    updates: [
      { date: '2026-07-09', text: 'Redesigned pace as a real rate comparison — recent %/min vs. the ideal %/min to land at exactly 100% at reset — instead of a static elapsed-vs-used snapshot.' },
      { date: '2026-07-06', text: 'Added a **GitHub-commit-graph-style heatmap**, permanent across restarts, plus live tokens/min and active-session count.' },
      { date: '2026-07-06', text: 'Shipped v1: statusLine-hook data capture, multi-session convergence, live TUI with progress bars and a pace badge.' },
    ],
    abstract: `**claudemaxxing** is a terminal dashboard that watches Claude Code's rolling 5-hour usage limit and tells you whether to use more, use less, or you're right on pace to use the whole window with nothing left over.

There's no public API for this — Claude Code only surfaces the rate-limit percentage through its statusLine hook, so the tool captures that stream into a shared local file across every open session, reconciling toward the most-advanced reading so multiple terminals never disagree. Pace compares a real trailing %/min consumption rate against the ideal rate needed to land at exactly 100% at reset, recalculated live every 60 seconds.

Also has a GitHub-style usage heatmap that persists permanently across restarts, and ninety philosopher quotes — one pool per pace state — each with a fake anachronistic tech job title. [On GitHub](https://github.com/paarth-r/claudemaxxing).`,
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
    featured: false,
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
      'A macOS notch utility that turns your MacBook notch into a control center: media control, calendar, a multi-provider AI chat with slash commands, file shelf, and system monitoring.',
    href: 'https://github.com/paarth-r/odin',
    year: '2025 - 2026',
    tech: ['Swift', 'SwiftUI', 'macOS', 'AppKit', 'Claude'],
    featured: false,
    image: '/images/odin.png',
    githubRepo: 'paarth-r/odin',
    updates: [
      { date: '2026-08-03', text: 'AI chat rebuilt around **three wire formats** (Anthropic Messages, OpenAI Chat Completions, Replicate) instead of one vendor: Claude by default, plus OpenAI, OpenRouter, Ollama, or any custom URL. Slash commands, a real markdown renderer, and a pile of AppKit panel/focus/gesture fixes.' },
    ],
    abstract: `**Odin** (odinv2) is a macOS utility that transforms your MacBook's notch into an interactive control center. Built with Swift and SwiftUI, it provides media control (Apple Music, Spotify, YouTube Music), calendar integration, a file shelf with AirDrop, system monitoring, and an **AI chat** panel that drops out of the notch—all from the menu bar.

The chat is provider-agnostic by design: it models three wire formats rather than three companies, so Claude (the default), OpenAI, OpenRouter, a local Ollama, or any self-hosted gateway work with a base URL and a key. Slash commands cover model, provider, effort, and thinking; the markdown renderer handles tables and fenced code with a copy button. Chat history is stored locally; no telemetry. Requires macOS 14 Sonoma or later and a notch-equipped MacBook. Based on the [boring.notch](https://github.com/TheBoredTeam/boring.notch) foundation; open source under GPL-3.0.`,
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
