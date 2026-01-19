# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to security@example.com. All security vulnerabilities will be promptly addressed.

Please include the following information:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Security Update Process

1. **Report**: Security issue is reported via email
2. **Triage**: Maintainers assess the vulnerability
3. **Fix**: Develop and test a fix
4. **Release**: Release a security patch
5. **Announce**: Notify users about the security update

## Security Best Practices

When using this template:

1. **Keep dependencies updated**: Regularly update dependencies to get security patches
2. **Use environment variables**: Never commit secrets to version control
3. **Enable HTTPS**: Always use HTTPS in production
4. **Validate input**: Validate and sanitize all user input
5. **Use security headers**: Configure appropriate security headers
6. **Regular security audits**: Run security audits regularly using `npm audit`

## Security Features

This template includes:

- JWT authentication
- Password hashing
- CORS configuration
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection

## Disclosure Policy

When we learn of a security vulnerability, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find similar problems
3. Prepare fixes for all supported versions
4. Release new versions as soon as possible
