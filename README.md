# Joana Rose D. Roy - Single-page Portfolio

Open index.html directly in a browser or serve the project with a static web server. No installation is required.

## Content and navigation

All portfolio content is in index.html, in seven sections: Home (#home), About (#about), Information (#information), Technical Skills (#skills), Projects (#projects), Resume (#resume), and Contact (#contact). Sidebar links, cards, and buttons scroll within the page. The current section is highlighted as you scroll. Browser back/forward and direct hash links are supported.

The sage-and-white palette, typography, fixed desktop sidebar, and original portrait are preserved. On mobile, the profile header stays available with a collapsible menu. Smooth scrolling and hover effects respect reduced-motion preferences.

The old about.html, information.html, education.html, and contact.html files contain compatibility redirects only. Old bookmarks open the corresponding section of index.html.

## Editing and building

Edit the content in index.html, styles in styles.css, and navigation behavior in portfolio.js. Run node build.js (or npm run build) to copy the static site and portrait into dist/. The .openai/hosting.json file retains the existing private Sites project.

Expected graduation is 2027, as confirmed by Joana. School years match the supplied resume. The age is computed from the supplied January 16, 2004 birthday.

## Skills, projects, and resume download

Technical Skills currently presents the supplied technical interests as learning areas, without proficiency claims. Projects features this actual portfolio with its HTML, CSS, and JavaScript stack. Replace or expand these entries in index.html when additional details are available.

The Resume heading and desktop sidebar download assets/joana-rose-roy-resume.pdf, a one-page resume made from the confirmed profile and education. To update it, edit resume.html, open it in Chrome, print with Save as PDF (A4, background graphics on, headers/footers off), and replace that asset before running node build.js. The existing build copies the PDF into dist/assets automatically.
