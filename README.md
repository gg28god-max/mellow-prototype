# Mellow · prototype de test

Interactive test prototype of **Mellow**, a subscription app that finds your subscriptions and cancels them for you (concierge model).

- Plain HTML, CSS and JS. No build step, no dependencies, no tracking.
- Opens on a test layer: 3 tasks, a timer, a 1–7 ease rating after each task, and a results summary the tester copies and sends back.
- Add `?demo=1` to the URL to skip the test layer and explore freely.
- Nothing is stored or sent. Bank sign-in is fake demo data.

## Tasks measured
1. Connect a bank and review found charges (time to "bank connected", completion).
2. Stop paying for Adobe Acrobat (time to cancel, whether the trial alert was used).
3. Find the next yearly charge.

Deploy: import this repo in Vercel as a static site (Framework preset: Other, no build command).
