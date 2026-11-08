# Mark Joseph Merano – Portfolio

Plain HTML/CSS/JS (no build step). Icons: Lucide via CDN.

## Run locally
- Double-click `index.html`, or for a local server: `npx serve .` / `python -m http.server 8000` then open http://localhost:8000

## Edit content
All text, projects, certificates and links live at the top of `js/main.js` (SITE, INFO, SKILLS, PROJECTS, CERTS).

## Add images
- `assets/profile.jpg` (hero portrait, 4:5 ratio)
- Project images live in `assets/brew-haven/` and `assets/forgeworks/`; add new projects in `PROJECTS` in `js/main.js`.
- Certificates: put files in `assets/certs/`, then set `img` and remove `placeholder:true` in CERTS.
Missing images fall back to labeled placeholders.

## Make the contact form work
Set `SITE.email` (opens the visitor's mail app) or `SITE.formEndpoint` (a Formspree / Web3Forms URL) for real sending.

## Deploy
- **Vercel**: push the folder to GitHub → vercel.com → Import project → Deploy (no settings needed).
- **Netlify**: drag the folder onto app.netlify.com/drop.
- **GitHub Pages**: push to a repo → Settings → Pages → deploy from `main` / root.
