# Security Policy

## Supported Versions

Currently supported versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of SCREEMA seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Publicly Disclose

Please do not create a public GitHub issue for security vulnerabilities.

### 2. Contact Us Directly

Send details to: **franklineonguti4@gmail.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### 3. Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Depends on severity
  - Critical: 1-3 days
  - High: 1-2 weeks
  - Medium: 2-4 weeks
  - Low: Next release cycle

## Security Measures

### Current Implementation

#### Authentication
- JWT-based authentication via Supabase
- Secure password hashing (bcrypt)
- Session management with refresh tokens
- HTTP-only cookies for token storage

#### Data Protection
- Input validation with Zod schemas
- XSS protection via React's built-in escaping
- CSRF protection
- SQL injection prevention (Supabase parameterized queries)

#### API Security
- Environment variables for sensitive data
- CORS configuration
- Rate limiting (Supabase)
- HTTPS enforced in production

#### Frontend Security
- Content Security Policy (CSP)
- Secure headers
- No inline scripts
- Dependency vulnerability scanning

### Best Practices for Contributors

#### Code Review
- All PRs require review before merge
- Security-focused code review checklist
- Automated dependency scanning

#### Dependencies
- Regular dependency updates
- Automated vulnerability alerts (Dependabot)
- Minimal dependency footprint

#### Environment Variables
- Never commit `.env` files
- Use `.env.example` for templates
- Rotate secrets regularly

## Known Security Considerations

### Current Limitations

1. **Mock Data Mode**
   - Currently using mock data for development
   - No real authentication in demo mode
   - Not suitable for production without backend

2. **Payment Integration**
   - Payment flow is UI-only
   - Requires proper PCI compliance for production
   - Must use certified payment gateway

3. **Rate Limiting**
   - Client-side rate limiting only
   - Requires server-side implementation for production

### Recommendations for Production

1. **Enable Supabase RLS (Row Level Security)**
   ```sql
   -- Example RLS policy
   CREATE POLICY "Users can only see their own bookings"
   ON bookings FOR SELECT
   USING (auth.uid() = user_id);
   ```

2. **Implement Server-Side Validation**
   - Validate all inputs on the server
   - Don't trust client-side validation alone

3. **Add Rate Limiting**
   - Implement API rate limiting
   - Use services like Cloudflare or AWS WAF

4. **Enable Monitoring**
   - Set up error tracking (Sentry)
   - Monitor for suspicious activity
   - Log security events

5. **Regular Security Audits**
   - Dependency audits: `npm audit`
   - Code security scanning
   - Penetration testing

## Security Checklist for Deployment

- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Supabase RLS policies enabled
- [ ] Rate limiting configured
- [ ] Error tracking set up
- [ ] Security headers configured
- [ ] Dependencies updated
- [ ] Secrets rotated
- [ ] Backup strategy in place
- [ ] Monitoring alerts configured

## Vulnerability Disclosure

We believe in responsible disclosure. If you report a vulnerability:

1. We will acknowledge receipt within 48 hours
2. We will provide regular updates on our progress
3. We will credit you in our security advisories (if desired)
4. We will notify you when the vulnerability is fixed

## Security Updates

Security updates will be released as:
- Patch versions for minor issues
- Minor versions for moderate issues
- Immediate hotfixes for critical issues

Subscribe to releases on GitHub to stay informed.

## Contact

For security concerns:
- **Email:** franklineonguti4@gmail.com
- **GitHub:** [@codebycartoon](https://github.com/codebycartoon)

For general questions, use GitHub Issues.

---

**Last Updated:** December 8, 2024
