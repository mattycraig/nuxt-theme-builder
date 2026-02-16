# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Nuxt UI Theme Builder, please report it responsibly.

**Do NOT open a public issue for security vulnerabilities.**

### How to Report

1. **Email:** Send details to the repository owner via [GitHub profile contact](https://github.com/mattycraig)
2. **GitHub Security Advisories:** Use the [private vulnerability reporting](https://github.com/mattycraig/nuxt-theme-builder/security/advisories/new) feature

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Acknowledgment:** Within 48 hours
- **Initial Assessment:** Within 7 days
- **Resolution:** Depends on severity, typically within 30 days

### Scope

This policy covers:

- The Nuxt UI Theme Builder application code
- Server API endpoints
- Client-side security (XSS, injection)
- Dependencies with known vulnerabilities

### Out of Scope

- Third-party services (Vercel, AI providers)
- User-provided API keys (handled client-side only)
- Theoretical attacks without proof of concept

## Security Measures

This project implements:

- `nuxt-security` module for CSP, rate limiting, and security headers
- Zod schema validation for all API inputs/outputs
- DOMPurify for sanitizing user content
- No server-side storage of user API keys
- Dependency vulnerability scanning via Renovate and GitHub Dependabot
