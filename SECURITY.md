# Security Policy

## Supported versions

This project ships as a single continuously-deployed website — there are no
maintained older versions. Security fixes are applied to `main` and released
immediately via the deploy pipeline.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Instead, report it privately using one of the following:

- **GitHub Private Vulnerability Reporting**: open the [Security tab](https://github.com/Samukelo-Mkhonza/harding-sec-website-project/security/advisories/new) on this repository and click "Report a vulnerability."
- **Email**: [Mkhonzasenzo525@gmail.com](mailto:Mkhonzasenzo525@gmail.com)

Please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce (proof-of-concept code or a minimal example is helpful)
- Any relevant environment details (browser, screen size, etc., if UI-related)

You should receive an acknowledgment within a few days. We'll keep you
updated as the issue is investigated and resolved, and credit you in the
fix's release notes unless you prefer to remain anonymous.

## Scope notes

The site is a client-side single-page application with no backend server —
most data (past papers metadata, university application info, etc.) is
static JSON served alongside the build, and user state (application
trackers, bookmarks) lives in the browser's `localStorage`. Reports most
relevant to this project include:

- Cross-site scripting (XSS) or other injection issues in rendered content
- Dependency vulnerabilities not already caught by [CodeQL](.github/workflows/codeql.yml) or [Dependabot](.github/dependabot.yml)
- Issues with the contact/newsletter/application forms (e.g. injection, unsafe redirects)
- Exposure of sensitive data that shouldn't be public

Automated static analysis (CodeQL) and dependency scanning (Dependabot) already run on every push to `main` — no need to report findings those tools would already surface, unless you believe one has been missed or mis-triaged.
