# AISOT 2026

A responsive static workshop website. No build step, backend, package installation, or visitor tracking. Institutional names and logos are deliberately withheld pending approval.

## Preview locally

From this folder, run `python3 -m http.server 8080` and visit http://localhost:8080. Use an HTTP server; opening index.html directly prevents browsers from fetching event.json.

## Update content

Edit `event.json`: event name, title, tagline, date labels, location, venue, registration status/URL/deadline, contact email, topics, organizing team, and program. Refresh the page to see changes. Static core content in index.html serves as a fallback; update matching fallback text and SEO metadata when event details change.

- Registration: set `registration.status` to `open` and `registration.url` to the approved HTTPS Microsoft Forms link. Set status to `closed` to disable registration. A missing or invalid URL cannot produce an active registration button. No participant information is collected here.
- Organizers: add approved objects with `name` and `role` to `organizers`.
- Contact: set `contactEmail` to the approved address.
- Program: edit the undated `program` themes. Only after schedule approval, populate `sessions` with objects containing `title`, `description`, `time` (include date and time zone), and optionally `speaker`. Nonempty sessions replace the theme list; update the preliminary heading and explanatory copy in index.html when confirming the program.
- Dates: the proposed range includes a possible fourth day. Confirm whether the event ends December 13 or 14 before changing the tentative labels.

## Deploy to GitHub Pages

1. Create or select the intended GitHub repository, suggested name `aisot2026`.
2. Upload this folder's contents, including `.github/workflows/pages.yml`, to its `main` branch.
3. In repository Settings → Pages, select **GitHub Actions** as the source.
4. Run the Deploy GitHub Pages workflow or push a change. The deployment URL appears in the workflow's environment.

All asset paths are relative, supporting both `https://USERNAME.github.io/aisot2026/` and a domain root. The workflow packages only public site assets; README and development files are not published.

## Custom domain later

After acquiring and confirming the domain, configure it in repository Settings → Pages, set its DNS records according to GitHub's current instructions, and enable HTTPS when available. Optionally add a `CNAME` file at the repository root containing the approved domain; the workflow preserves it. No application rebuild is required. Add the final canonical URL and `og:url` metadata after the actual address is known. For broader social crawler compatibility, replace assets/social.svg with a 1200×630 PNG and use its absolute deployed URL in the Open Graph image metadata.

## Publication review

Confirm title, dates (including December 14), venue, remote participation, registration eligibility, deadline, form URL, organizer names, contact address, and institutional acknowledgment permissions. Publish approved details only. No endorsement, hotel support, tool access, session times, or speakers are implied by the draft.

## Privacy

The website uses no analytics, cookies, local storage, or registration fields. Registration, when enabled, takes place on the external Microsoft Forms service under its applicable privacy notice. Hosting providers may process ordinary request logs. Add any organizer-approved privacy contact and retention notice to the form before opening registration.
