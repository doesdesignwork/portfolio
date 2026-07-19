# Gerard Teo Portfolio

Gerard Teo's production portfolio, built with Next.js and deployed on Vercel.

## Local development

Use Node.js 22.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

## Vercel deployment

Import this repository into Vercel with the **Next.js** framework preset. The
repository uses the standard commands Vercel expects:

- Install: `npm install` or `npm ci`
- Build: `npm run build`
- Output: `.next` (automatic)

Set `NEXT_PUBLIC_SITE_URL` to the final production domain when a custom domain
is connected. Otherwise the deployment uses Vercel's production project URL
for canonical links, sitemap entries, structured data and agent-readable files.

## Search and agent discovery

The production build exposes:

- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- `/llms-full.txt`
- `/agent-index.json`
- `/googlef76fcae5b96c2b81.html`

## Contact

Gerard Teo — [g@doesdesignwork.com](mailto:g@doesdesignwork.com)
