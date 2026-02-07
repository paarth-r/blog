# Project images

Drop hero images for each project here. They appear at the top of the project page (e.g. `/projects/jarvis`).

## Expected filenames

Use the same name as the project `id` in `app/data/projects.ts`:

| Project ID   | Add this file      |
|-------------|--------------------|
| jarvis      | `jarvis.png`       |
| hyperform   | `hyperform.png`    |
| odin        | `odin.png`         |
| blog        | `blog.png`         |

Supported formats: `.png`, `.jpg`, `.jpeg`, `.webp`

- **Aspect ratio:** The image is cropped to a wide banner (aspect-video). Landscape works best.
- **Size:** ~1200×630 or similar is plenty; the site will scale it.

## Alternative: use a URL

Instead of a local file, you can set `image` in `app/data/projects.ts` to a full URL, e.g.:

```ts
image: 'https://example.com/my-screenshot.png',
```

Then you don’t need to add anything in this folder for that project.
