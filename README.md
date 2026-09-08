# 🌊 Marées Sync

A modern, responsive Next.js web application designed to easily find French port tidal information and synchronize 30-day rolling tide schedules directly into personal calendars via ICS download or Webcal subscription.

## Creator & Ownership

- **Author & Creator:** Clément Saux
- **Status:** Proprietary software. All rights reserved.

## Features

- **Exhaustive Port Directory:** Instantaneous search and alphabetical selection dropdown covering all available French ports.
- **Calendar Integration:** One-click download of `.ics` files or direct webcal calendar subscription links.
- **Dark Glassmorphism UI:** Built with Tailwind CSS, offering a clean, modern, and fluid user experience.
- **Automated Deployment:** Seamless local-to-GitHub-to-Vercel CI/CD workflow.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Source:** [api-maree.fr](https://api-maree.fr/) (Ifremer / PREVIMER harmonic components)

## Data Attribution & Licensing

- Tide data provided by **api-maree.fr** under the **CC BY** license.
- Calculations derived from harmonic components by **Ifremer / PREVIMER**, also under the **CC BY** license.

## Terms of Use

This repository's source code is proprietary. You are welcome to view the code for educational or portfolio purposes, but reproduction, redistribution, modification, or commercial exploitation without explicit prior written consent from the author is strictly prohibited.

------------------------------------------------------------------------------------

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
