---
slug: centralized-authentication-system-yoruverse
title: Centralized Authentication System for Yoruverse
description: Design and implement a centralized authentication system in yoruverse.com
date: 2025-03-15
author: 
  name: Jotis
  avatar: https://github.com/jotis1.png
  link: https://github.com/jotis1
---

## Introduction

### Objective

Design and implement a centralized authentication system in yoruverse.com that allows users to log in using external providers (Google, Discord, etc.) and share the session across different subdomains (e.g., [gacha.yoruverse.com](http://gacha.yoruverse.com)). This will prevent users from having to log in for each application and will delegate the 2FA management to the authentication providers.

### Vision

Create a seamless, secure, and scalable user experience that centralizes authentication and profile management, making it easy to integrate new applications into the Yoruverse ecosystem.

## Project Scope and Requirements

### Core Features

* **Centralized Login:**
  Users log in at [yoruverse.com](http://yoruverse.com) using OAuth providers such as Google, Discord, and others.
* **Shared Session Management:** Secure cookies configured for the `.yoruverse.com` domain will allow session persistence across subdomains.
* **2FA Delegation:** Since authentication is handled by external providers, two-factor authentication is managed externally, reducing system complexity.
* **Per-Application Profile Management:**
  When accessing a new application, the system checks if a linked profile exists. If not, it creates one and associates it with the central user account.

### Technologies Used:

* **Frontend:**
  Applications primarily build with Next.js, leveraging SSR and modern React features for a fast and secure experience.
* **Backend and Database:**
  Using Supabase for database management, taking advantage of PosgtreSQL and row-level security (RLS) policies.
* **Authentication Providers:**
  OAuth2 integration with Google, Discord, and other providers to enable passwordless login.

## System Architecture

### General Design

* **Centralized Authentication:** [yoruverse.com](http://yoruverse.com) will handle login flows and issue session tokens (ideally JWTs) set in cookies with the `Domain=.yoruverse.com` attribute for accessibility across all subdomains.
* **Inter-Application Communication:**
  Each subdomain (e.g., [gacha.yoruverse.com](http://gacha.yoruverse.com)) will validate the existing session. If no profile is found, it will call the backend to create and link the profile.

### Integration with External Providers

* **OAuth2 Flow:**
  1. The user selects a provider (Google, Discord, etc.) on the authentication page.
  2. They are redirected to the provider for authentication.
  3. Upon return, the received token is processed, and the user account is created or updated in the central database.
  4. A JWT is issued, and a session cookie is set.
* **Key and Permission Configuration:**
  Each integration must have its respective keys and secrets, along with specific scopes to retrieve necessary user information.

## Authentication and Profile Management Flow

### Login Flow

1. **Access [yoruverse.com](http://yoruverse.com):**
   The user visits the authentication page and selects a login method.
2. **Redirection to Provider:**
   The user is redirected to the OAuth provider’s authentication flow.
3. **Token Reception:**
   After authentication, the provider redirects back to your app with a token.
4. **Verification and Registration:**
   * Validate the token and fetch user details.
   * If the user is new, create a record in the Supabase database.
   * Issue a JWT and set a session cookie for the `.yoruverse.com` domain.
5. **Accessing Subdomains:**
   When accessing any subdomain, the session is checked. If no specific profile exists, an API call creates and links it to the central account.

### Per-Application Profile Management

* **Dynamic Verification:**
  Each application, upon receiving a valid session, must check if a linked profile exists for that specific service.
* **Automatic Profile Creation:**
  If none exists, the backend should create a profile using the central user data and register any additional required information.
* **Data Synchronization:**
  Ensure profile updates reflect across all applications in real-time.

## Security Measures

### Secure Communication

* **Mandatory HTTPS:**
  All communication must be encrypted via HTTPS.
* **Secure Cookies:**
  * Configure session cookies with `Secure` and `HttpOnly` attributes.
  * Set `SameSite` appropriately (`Lax` or `Strict`).

### Token Validation and Control

* **JWT Best Practices:**
  * Sign and verify tokens with secure keys.
  * Set appropriate expiration times and implement refresh mechanisms.
* **Token Revocation System:**
  Implement a system to revoke compromised or invalid tokens.

### Attack Prevention

* **CSRF and XSS Protection:**
  * Use CSRF tokens for sensitive endpoints.
  * Implement Content Security Policy (CSP) in Next.js to mitigate XSS attacks.
* **Rate Limiting and Monitoring:**
  * Implement request limits to prevent brute force attacks.
  * Use logging and monitoring to detect anomalies.
* **Security Audits:**
  * Regularly review and audit code and security settings.
  * Conduct penetration tests and vulnerability assessments.

### Secure Data Management

* **Supabase and RLS:**
  * Configure Row-Level Security (RLS) policies to ensure users only access their own data.
  * Perform regular backups and establish a disaster recovery plan.
* **Secret Management:**
  * Use secure environment variables or secret management tools (e.g., Vault) for storing keys and tokens.

## Implementation and Deployment Considerations

### Development and Testing

* **Continuous Integration and Deployment (CI/CD):**
  Establish pipelines for automated testing, deployment, and security reviews.
* **Separate Environments:**
  * Keep development, staging, and production environments isolated.
  * Conduct security and load testing in staging before deploying to production.

### Scalability and Maintenance

* **Monitoring and Logging:**
  * Implement monitoring tools to detect real-time anomalies.
  * Analyze authentication and activity logs for suspicious patterns.
* **Updates and Patches:**
  Keep dependencies updated and regularly review security configurations.

## Timeline and Next Steps

1. **Design Phase:**
   * Requirement analysis.
   * Architecture and flowchart design.
     *Estimated duration: 2 weeks.*
2. **Development Phase:**
   * Implement Next.js authentication module.
   * Integrate OAuth providers and secure cookies.
   * Develop profile management endpoints.
     *Estimated duration: 4-6 weeks.*
3. **Testing and Security Audit:**
   * Unit, integration, and security testing.
   * Audit and policy review.
     *Estimated duration: 2-3 weeks.*
4. **Deployment and Monitoring:**
   * Deploy to staging, then production.
   * Implement monitoring and logging tools.
     *Estimated duration: 1-2 weeks*

---

Thanks for reading, and happy coding! 🚀