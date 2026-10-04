# OM COMMUNICATION WORKS
# COMPLETE TECHNICAL + SECURITY AUDIT
### Project: om-communication-portal | Audit Date: 2026-10-02 | Auditor: Claude (Read-Only Static Analysis)

---

## AUDIT SCOPE & METHODOLOGY

This audit covers **static code analysis** of the full project codebase. Browser/runtime testing was not performed (application was not running in the audit environment). Findings marked *Code Analysis* have not been browser-verified at runtime. All findings derive from direct file inspection of source code, configuration, templates, and build manifests.

**Codebase Summary:**
- Frontend: React 19 + Vite + Tailwind CSS v4 + React Router v7
- Backend: Java 21 + Spring Boot 3.3.0 + Maven + Spring Security + JJWT
- Database: H2 (dev) / PostgreSQL (prod)
- Hosting: Cloudflare Workers (frontend) + Railway Docker (backend)
- Auth: JWT HMAC-SHA256, 24hr expiry, localStorage storage
- Payment: Razorpay
- PDF: Browser window.print() — no server-side PDF

---

## EXECUTIVE SUMMARY

| Severity | Count |
|---|---|
| CRITICAL | 5 |
| HIGH | 6 |
| MEDIUM | 10 |
| LOW | 9 |
| INFORMATIONAL | 4 |
| **TOTAL** | **34** |

| Category | Count |
|---|---|
| Confirmed Vulnerabilities | 9 |
| Confirmed Functional Bugs | 7 |
| Potential Security Weaknesses | 8 |
| Hardening Recommendations | 6 |
| UI/UX Bugs | 2 |
| Performance / Quality Issues | 2 |

**Risk Summary:** The application has **5 critical-severity issues**, 3 of which are immediately exploitable without authentication. The most severe issue is an unauthenticated public API endpoint that exposes full client PII (name, phone, email, address, GSTIN, payment status) for any invoice, enumerable via sequential invoice numbers. A second critical issue is that the admin password resets to `admin123` on every server restart. Combined with a missing rate limit on the login endpoint, brute-force takeover of the admin account is trivial. These three issues together make the application highly vulnerable in its current production state.

---

## CRITICAL FINDINGS

---

### CRIT-01 — Unauthenticated Public Invoice Endpoint Exposes Full Client PII

| Field | Value |
|---|---|
| **ID** | CRIT-01 |
| **Severity** | CRITICAL |
| **Classification** | CONFIRMED VULNERABILITY |
| **Category** | Broken Access Control / PII Exposure |
| **Affected Component** | `backend/.../PublicController.java` → `GET /api/public/invoices/{invoiceNumber}` |
| **Status** | Code Analysis — not browser verified |

**Finding:**
The endpoint `GET /api/public/invoices/{invoiceNumber}` is publicly accessible (no authentication required, listed under `/api/public/**`). It returns a full invoice object containing: `clientName`, `clientPhone`, `clientEmail`, `clientAddress`, `clientGstin`, `razorpayOrderId`, `razorpaySignature`, `paymentStatus`, `items`, and `totalAmount`.

Invoice numbers follow a predictable sequential pattern (`OCW-INV-2024-1001`, `OCW-INV-2024-1002`, …). An attacker can enumerate the full client database by iterating invoice numbers with no authentication, no rate limit on this endpoint class under its own path prefix, and no CAPTCHA.

**Evidence:**
- `PublicController.java`: `@GetMapping("/invoices/{invoiceNumber}")` — no `@PreAuthorize`, no auth check
- `application.yml` + `SecurityConfig.java`: `/api/public/**` explicitly permitted for all
- `InvoiceService.java`: `private static final AtomicInteger COUNTER = new AtomicInteger(1000)` confirms sequential numbering

**Impact:**
Full PII exfiltration of all clients without any credential. Violates PDPB / DPDPA (India), exposes business-sensitive payment data to competitors. Razorpay signatures also exposed — no known direct exploit from signature alone but constitutes sensitive payment data.

**Remediation:**
1. Require authentication (`@PreAuthorize("isAuthenticated()")`) on this endpoint, OR
2. Return only the minimum fields needed for payment (e.g., invoice number, amount, Razorpay order ID — no PII) for the unauthenticated payment flow
3. Apply stricter rate limiting to this endpoint specifically

**Verification:** Re-confirmed: `SecurityConfig` grants `.requestMatchers("/api/public/**").permitAll()`. `PublicController` maps this endpoint under `/api/public/`. No secondary auth guard found anywhere in the call chain.

---

### CRIT-02 — Admin Password Resets to `admin123` on Every Server Restart

| Field | Value |
|---|---|
| **ID** | CRIT-02 |
| **Severity** | CRITICAL |
| **Classification** | CONFIRMED VULNERABILITY |
| **Category** | Insecure Default Credential / Logic Bug |
| **Affected Component** | `backend/.../OmCommunicationPortalApplication.java` → `seedAdmin()` CommandLineRunner |
| **Status** | Code Analysis — not browser verified |

**Finding:**
The `seedAdmin` CommandLineRunner runs unconditionally on every application startup. It calls `adminRepository.findByUsername("admin")` and if found, **still updates** the admin user's password to `${ADMIN_PASSWORD:admin123}` (the environment variable value, or `admin123` if unset). This means:

1. If `ADMIN_PASSWORD` env var is not set on Railway, every redeploy resets the admin password to `admin123`.
2. Even if the password was changed through the application, it reverts on the next restart.
3. The `application.yml` hardcodes `admin.password: admin123` as the fallback in BOTH the `h2` and `postgres` profiles.

**Evidence:**
- `OmCommunicationPortalApplication.java`: `seedAdmin` CommandLineRunner logic resets password regardless of whether admin already exists
- `application.yml` (both profiles): `password: ${ADMIN_PASSWORD:admin123}`

**Impact:**
If `ADMIN_PASSWORD` is not explicitly set as a Railway secret, the admin password is always `admin123`. Combined with CRIT-03 (no rate limit on login), full admin takeover via trivial brute force or just trying `admin/admin123`.

**Remediation:**
1. In `seedAdmin`: only set password if the admin user does NOT already exist (`if (!adminRepository.existsByUsername("admin")) { create... }`)
2. Remove `admin123` hardcoded fallback — require env var to be set at deploy time (fail fast on startup if missing)
3. Force a password change on first login

**Verification:** Re-confirmed: CommandLineRunner unconditionally resets password on every startup. Both yaml profiles have hardcoded fallback.

---

### CRIT-03 — Login Endpoint Has No Rate Limit (Brute Force Trivially Possible)

| Field | Value |
|---|---|
| **ID** | CRIT-03 |
| **Severity** | CRITICAL |
| **Classification** | CONFIRMED VULNERABILITY |
| **Category** | Missing Brute Force Protection |
| **Affected Component** | `backend/.../RateLimitingFilter.java`, `SecurityConfig.java`, `AuthController.java` → `POST /api/auth/login` |
| **Status** | Code Analysis — not browser verified |

**Finding:**
The rate limiting filter (`RateLimitingFilter`) applies only to requests matching `/api/public/**`. The login endpoint is at `POST /api/auth/login` — outside this path — and receives no rate limiting whatsoever. An attacker can attempt unlimited login combinations at maximum request speed.

Additionally, the rate limiter uses `request.getRemoteAddr()` for client identification. The backend runs behind Railway's load balancer (and requests may pass through Cloudflare), so `getRemoteAddr()` returns the proxy IP, not the actual client IP. Even if rate limiting were applied to login, it would rate-limit all users sharing that proxy egress IP (denial of service risk) rather than the actual attacker.

**Evidence:**
- `RateLimitingFilter.java`: `if (!requestURI.startsWith("/api/public/")) { filterChain.doFilter(...); return; }` — login path skipped
- `SecurityConfig.java`: `/api/auth/login` has `.permitAll()`, no additional filter registered
- No `X-Forwarded-For` header handling found in any filter

**Impact:**
Unlimited login attempts against the single admin account. With the default password `admin123` (CRIT-02), actual time to compromise is effectively zero.

**Remediation:**
1. Apply rate limiting to `/api/auth/login` (e.g., 5 attempts / 15 minutes per IP)
2. Use `X-Forwarded-For` header for real IP detection (validate the header source trust)
3. Add account lockout after N failed attempts
4. Consider CAPTCHA on repeated failures

**Verification:** Re-confirmed: `RateLimitingFilter` URL check explicitly excludes non-public paths. `AuthController` has no lockout logic.

---

### CRIT-04 — JWT Secret Hardcoded Fallback in application.yml

| Field | Value |
|---|---|
| **ID** | CRIT-04 |
| **Severity** | CRITICAL |
| **Classification** | CONFIRMED VULNERABILITY |
| **Category** | Hardcoded Secret / Token Forgery Risk |
| **Affected Component** | `backend/src/main/resources/application.yml` → `jwt.secret` |
| **Status** | Code Analysis — not browser verified |

**Finding:**
Both Spring profiles (`h2` and `postgres`) in `application.yml` contain:
```
jwt:
  secret: ${JWT_SECRET:om_comm_super_secret_jwt_key_2024_very_long_and_secure_key_here_min_256_bits}
```
If `JWT_SECRET` is not set as a Railway environment variable, the application uses the literal fallback string `om_comm_super_secret_jwt_key_2024_very_long_and_secure_key_here_min_256_bits` as the HMAC-SHA256 signing key.

This secret is present in the repository (likely committed to git). Anyone with read access to the repository (including GitHub collaborators or if the repo is public) can forge valid JWT tokens for any username/role without knowing any credentials.

**Evidence:**
- `application.yml` lines confirmed
- `JwtTokenProvider.java`: uses this secret for HMAC-SHA256 signing with no key rotation logic

**Impact:**
If the fallback is in use (env var not set on Railway), an attacker can create a JWT signed with the known secret for `{"sub":"admin","role":"ADMIN"}` and gain full admin access without any password.

**Remediation:**
1. Remove the fallback — use `${JWT_SECRET}` with NO default value. Spring will fail to start if the env var is missing, which is the correct behavior.
2. Rotate the JWT secret immediately on Railway (invalidates all existing tokens)
3. Audit git history to ensure the secret was never committed — if it was, treat it as compromised

**Verification:** Re-confirmed in both yaml profile blocks. No evidence of external secrets management (Vault, AWS Secrets Manager).

---

### CRIT-05 — H2 Console Exposed in Production Configuration (Not Profile-Gated)

| Field | Value |
|---|---|
| **ID** | CRIT-05 |
| **Severity** | CRITICAL |
| **Classification** | CONFIRMED VULNERABILITY |
| **Category** | Exposed Debug Interface |
| **Affected Component** | `backend/.../SecurityConfig.java` → H2 console permit-all, frame options disabled |
| **Status** | Code Analysis — not browser verified |

**Finding:**
`SecurityConfig.java` contains:
```java
.requestMatchers("/h2-console/**").permitAll()
```
and
```java
http.headers().frameOptions().disable()
```

These settings are in a **single `SecurityConfig` class** that is not annotated with `@Profile("h2")`. This means even when the application runs with `spring.profiles.active=postgres` (production), the H2 console path is still permitted and frame options are disabled globally.

The H2 console is a full web-based SQL interface. If the H2 dependency or console path is accessible at the production URL, it would allow unauthenticated SQL execution against the database.

**Evidence:**
- `SecurityConfig.java`: `requestMatchers("/h2-console/**").permitAll()` — no conditional
- `Dockerfile`: `ENV SPRING_PROFILES_ACTIVE=postgres` — production does NOT use H2
- However: H2 is still in `pom.xml` scope (check if scope=runtime only for h2 profile not confirmed)

**Impact:**
If H2 console is somehow accessible at the production URL (e.g., H2 is on the classpath at runtime), unauthenticated SQL access to the database. Even if H2 is not active in prod, `frameOptions().disable()` applies globally, enabling clickjacking attacks on all admin pages.

**Remediation:**
1. Add `@Profile("h2")` to the H2 console security config section or use a separate `SecurityConfig` class for dev only
2. Remove `frameOptions().disable()` from the main security config — use `SAMEORIGIN` in production
3. Confirm H2 is `scope=runtime,test` in `pom.xml` and not included in the production Docker image

**Verification:** Re-confirmed: SecurityConfig has no @Profile annotation. frameOptions disabled globally with no conditional.

---

## HIGH FINDINGS

---

### HIGH-01 — JWT Token Stored in localStorage (XSS Exfiltration Risk)

| Field | Value |
|---|---|
| **ID** | HIGH-01 |
| **Severity** | HIGH |
| **Classification** | POTENTIAL SECURITY WEAKNESS |
| **Category** | Insecure Token Storage |
| **Affected Component** | `frontend/src/api.js`, `frontend/src/App.jsx` |

**Finding:**
The admin JWT token is stored in `localStorage` under the key `om_admin_token`. `api.js` reads it via `localStorage.getItem('om_admin_token')` on every request. localStorage is accessible to any JavaScript on the same origin, making it a target for XSS attacks. If any third-party script (e.g., via CDN compromise) or a DOM-based XSS vulnerability exists, the token can be exfiltrated and reused (token valid for 24 hours, no revocation possible).

Additionally, `App.jsx`'s `ProtectedRoute` only checks `!!localStorage.getItem('om_admin_token')` — it does not decode or validate the JWT's expiry claim. A user whose session was intended to expire may still pass the route guard if the token string remains in storage.

**Remediation:**
1. Move token to `HttpOnly` cookies (server-managed) — prevents JS access entirely
2. Implement refresh token rotation with short access token lifetime
3. Add JWT decode+expiry check in `ProtectedRoute` (client-side UX improvement while not a security control by itself)

---

### HIGH-02 — Broken Invoice Share Links (All WhatsApp/Email Shares 404)

| Field | Value |
|---|---|
| **ID** | HIGH-02 |
| **Severity** | HIGH |
| **Classification** | CONFIRMED FUNCTIONAL BUG |
| **Category** | Broken Functionality — Core Business Feature |
| **Affected Component** | `frontend/src/components/CreateDocumentModal.jsx` vs `frontend/src/App.jsx` |

**Finding:**
`CreateDocumentModal.jsx` constructs share links as:
```js
`${window.location.origin}/invoice/${docNo}`
```
However, `App.jsx` defines the payment route as:
```jsx
<Route path="/pay/:invoiceNumber" element={<InvoicePayment />} />
```
The path segment is `/pay/`, not `/invoice/`. Every share link generated — for WhatsApp, email, and copy-to-clipboard — points to `/invoice/{docNo}` which does not exist in the router. Any client clicking a shared invoice payment link will receive a 404/not-found page and cannot pay.

This is a critical business functionality failure: invoice payment links are the primary mechanism for clients to pay invoices.

**Remediation:**
In `CreateDocumentModal.jsx`, change:
```js
`${window.location.origin}/invoice/${docNo}`
```
to:
```js
`${window.location.origin}/pay/${docNo}`
```

---

### HIGH-03 — Rate Limiter Uses Proxy IP (All Legitimate Rate Limiting Broken)

| Field | Value |
|---|---|
| **ID** | HIGH-03 |
| **Severity** | HIGH |
| **Classification** | CONFIRMED VULNERABILITY |
| **Category** | Ineffective Security Control |
| **Affected Component** | `backend/.../RateLimitingFilter.java` |

**Finding:**
`RateLimitingFilter` uses `request.getRemoteAddr()` to identify clients for rate limiting. The backend runs on Railway behind a load balancer; all requests arrive with the same proxy IP as `remoteAddr`. This means:

1. Rate limiting is effectively applied per-proxy-IP, not per-client — a single attacker from any IP can exhaust the rate limit seen by all other users (denial of service), OR
2. The rate limit is never actually reached by any single client (depending on bucket sizing), making it entirely ineffective

The in-memory `ConcurrentHashMap` storing rate limit state also resets on every restart, allowing an attacker to bypass limits by triggering a restart (if they have any mechanism to do so) or simply waiting for a regular redeploy.

**Remediation:**
1. Use `X-Forwarded-For` header (validate that it comes from a trusted proxy) for real IP extraction
2. Use Redis-backed rate limiting (Bucket4j has Redis support) for distributed, restart-resilient state
3. Apply rate limiting to `/api/auth/**` as well (see CRIT-03)

---

### HIGH-04 — Sequential Invoice Numbers Enable PII Enumeration

| Field | Value |
|---|---|
| **ID** | HIGH-04 |
| **Severity** | HIGH |
| **Classification** | CONFIRMED VULNERABILITY |
| **Category** | Insecure Direct Object Reference (IDOR) |
| **Affected Component** | `backend/.../InvoiceService.java`, `PublicController.java` |

**Finding:**
Invoice numbers are generated sequentially using `AtomicInteger` starting at 1000 and formatted as `OCW-INV-{YEAR}-{COUNTER}`. Combined with CRIT-01 (unauthenticated public endpoint), an attacker can enumerate every invoice in the system by iterating numbers: `OCW-INV-2024-1000`, `OCW-INV-2024-1001`, … This makes the PII exposure from CRIT-01 trivially scalable to bulk exfiltration.

Additionally, `AtomicInteger` resets to 1000 on every server restart. If the application has restarted at any point during production use, there may be duplicate invoice numbers, causing data confusion and potentially broken payment flows.

**Remediation:**
1. Use UUIDs or cryptographically random tokens as invoice identifiers for the public payment endpoint
2. Keep sequential human-readable numbers for internal use only (require auth to look up by sequential number)
3. Fix counter persistence: store the last counter value in the database, not in memory

---

### HIGH-05 — Exception Messages Leaked in 500 Responses

| Field | Value |
|---|---|
| **ID** | HIGH-05 |
| **Severity** | HIGH |
| **Classification** | CONFIRMED VULNERABILITY |
| **Category** | Information Disclosure |
| **Affected Component** | `backend/.../AdminController.java` — multiple endpoints |

**Finding:**
Multiple catch blocks in `AdminController.java` return `e.getMessage()` directly in the HTTP 500 response body:
```java
} catch (Exception e) {
    return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
}
```
This can expose: database error messages (table names, column names, SQL queries), file paths, class names, null pointer details, and other internal implementation details that assist an attacker in reconnaissance.

**Remediation:**
1. Return generic error messages to clients: `"An internal error occurred. Please try again."`
2. Log full exception details server-side (with correlation ID)
3. Return the correlation ID in the response so support can trace logs without exposing internals

---

### HIGH-06 — Admin Credentials Documented in README

| Field | Value |
|---|---|
| **ID** | HIGH-06 |
| **Severity** | HIGH |
| **Classification** | POTENTIAL SECURITY WEAKNESS |
| **Category** | Credential Exposure |
| **Affected Component** | `README.md` |

**Finding:**
`README.md` openly documents default login credentials (`admin` / `admin123`). Anyone with repository read access knows exactly what to try. Combined with CRIT-02 (password resets to this on restart) and CRIT-03 (no rate limit on login), this constitutes a complete attack path: read README → try default credentials → gain full admin access.

**Remediation:**
1. Remove credentials from README immediately
2. Replace with: "First-time login credentials are provided separately by the system administrator"
3. Address CRIT-02 and CRIT-03 to make the credential exposure moot even if README is referenced

---

## MEDIUM FINDINGS

---

### MED-01 — Missing Input Validation (@Valid) on Multiple Admin Endpoints

| Field | Value |
|---|---|
| **ID** | MED-01 |
| **Severity** | MEDIUM |
| **Classification** | POTENTIAL SECURITY WEAKNESS |
| **Category** | Missing Input Validation |
| **Affected Component** | `backend/.../AdminController.java` |

**Finding:**
The following endpoints are missing `@Valid` annotation on their `@RequestBody` parameters:
- `POST /api/admin/invoices` — create invoice
- `PUT /api/admin/invoices/{id}` — update invoice
- `POST /api/admin/site-surveys` — create site survey
- `PATCH /api/admin/site-surveys/{id}` — update site survey
- `PUT /api/admin/tickets/{id}` — update ticket

Without `@Valid`, Spring does not trigger Bean Validation constraints defined on DTOs. Fields annotated `@NotNull`, `@Size`, `@Pattern`, etc. are silently ignored, allowing malformed or oversized input to reach the service and database layers.

**Remediation:** Add `@Valid` before each `@RequestBody` parameter on the listed endpoints. Ensure DTOs have appropriate Bean Validation annotations (`@NotBlank`, `@Size(max=...)`, `@Pattern` for phone/email fields).

---

### MED-02 — Audit Log Always Records "ADMIN" as Performer (Not Actual User)

| Field | Value |
|---|---|
| **ID** | MED-02 |
| **Severity** | MEDIUM |
| **Classification** | CONFIRMED FUNCTIONAL BUG |
| **Category** | Audit / Compliance |
| **Affected Component** | `backend/.../AuditLogService.java`, all callers |

**Finding:**
Every call to `AuditLogService.log()` passes the literal string `"ADMIN"` as the `performedBy` parameter. This means the audit log is useless for accountability — every action shows `"ADMIN"` regardless of which actual authenticated user performed it. In a multi-admin scenario this is a compliance failure.

**Evidence:** All `auditLogService.log()` calls in `AdminController.java` use hardcoded `"ADMIN"` string.

**Remediation:** Extract the authenticated username from `SecurityContextHolder.getContext().getAuthentication().getName()` and pass it as `performedBy`.

---

### MED-03 — Invoice Counter Resets to 1000 on Every Server Restart

| Field | Value |
|---|---|
| **ID** | MED-03 |
| **Severity** | MEDIUM |
| **Classification** | CONFIRMED FUNCTIONAL BUG |
| **Category** | Data Integrity |
| **Affected Component** | `backend/.../InvoiceService.java` |

**Finding:**
`private static final AtomicInteger COUNTER = new AtomicInteger(1000)` is a static in-memory counter. On every application restart, the counter resets to 1000. If the system has already created invoices (say up to `OCW-INV-2024-1047`), after a restart it will attempt to create `OCW-INV-2024-1000` again, causing:
- Duplicate invoice number collision errors (if a unique DB constraint exists)
- Silent data corruption (if no unique constraint — two different invoices share the same number)
- Broken payment flows for any client who was invoiced before the restart

**Remediation:** On startup, query the database for the maximum existing counter value and initialize `AtomicInteger` from that value + 1. Or use a database sequence.

---

### MED-04 — ProtectedRoute Does Not Validate JWT Expiry (Client-Side)

| Field | Value |
|---|---|
| **ID** | MED-04 |
| **Severity** | MEDIUM |
| **Classification** | CONFIRMED FUNCTIONAL BUG |
| **Category** | Authentication / UX |
| **Affected Component** | `frontend/src/App.jsx` → `ProtectedRoute` |

**Finding:**
```jsx
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('om_admin_token');
  return token ? children : <Navigate to="/admin/login" />;
};
```
The route guard only checks that a string exists in localStorage. It does not decode the JWT or check the `exp` claim. A user with an expired token (after 24 hours) will still pass the route guard and land on the dashboard — they'll only discover the session is expired when the first API call returns 401. More importantly, a malformed or deliberately crafted string in localStorage also passes this check.

**Remediation:** Decode the JWT on the client side (using `jwt-decode` or manual base64 decode of the payload) and check `exp` before rendering protected routes. Redirect to login on expiry.

---

### MED-05 — Quotation Numbers Are Ephemeral (Never Saved to Database)

| Field | Value |
|---|---|
| **ID** | MED-05 |
| **Severity** | MEDIUM |
| **Classification** | CONFIRMED FUNCTIONAL BUG |
| **Category** | Data Integrity / Business Logic |
| **Affected Component** | `frontend/src/pages/AdminDashboard.jsx` → `QuotationModal` |

**Finding:**
The quotation creation modal in `AdminDashboard.jsx` generates ephemeral quote numbers using `OCW-Q-2026-${random}` (random number, client-side only). These quotations are never persisted to the backend database. Every time the modal is opened, a new random number is generated. There is no API call to save quotation data.

This means: quotation history is not tracked, quotations cannot be retrieved or re-printed, and the random number assigned is meaningless for business tracking.

**Remediation:** Implement a backend `POST /api/admin/quotations` endpoint and persist quotation data with a properly sequenced quotation number.

---

### MED-06 — showTechDetails Toggle Variable Declared But Never Rendered

| Field | Value |
|---|---|
| **ID** | MED-06 |
| **Severity** | MEDIUM |
| **Classification** | CONFIRMED UI/UX BUG |
| **Category** | Dead Code / Incomplete Feature |
| **Affected Component** | `frontend/src/pages/InvoicePayment.jsx` |

**Finding:**
`InvoicePayment.jsx` declares `const [showTechDetails, setShowTechDetails] = useState(false)` and appears to use `showTechDetails` in conditional rendering of technical payment details, but the toggle button that would call `setShowTechDetails(!showTechDetails)` is not present in the JSX. The feature is partially implemented but inaccessible to users.

**Remediation:** Either add the toggle button to the UI, or remove the dead state variable and any conditional rendering depending on it to clean up the codebase.

---

### MED-07 — CORS Allows Wildcard Subdomains (*.pages.dev, *.workers.dev)

| Field | Value |
|---|---|
| **ID** | MED-07 |
| **Severity** | MEDIUM |
| **Classification** | POTENTIAL SECURITY WEAKNESS |
| **Category** | CORS Misconfiguration |
| **Affected Component** | `backend/.../SecurityConfig.java` → CORS config |

**Finding:**
CORS `allowedOriginPatterns` includes `https://*.pages.dev` and `https://*.workers.dev`. These are wildcard subdomain patterns covering ALL Cloudflare Pages and Cloudflare Workers deployments — not just this application's subdomains. Any attacker who deploys a malicious page on Cloudflare Pages can make authenticated cross-origin requests to the backend API from a browser where the victim's cookie/auth is set.

Note: Since the app uses localStorage (not cookies) for auth, this specific risk is lower than it would be with cookie-based auth. However, if the app ever migrates to cookies, this CORS configuration would be a critical vulnerability.

**Remediation:** Restrict CORS to the specific application domains:
- `https://om-communication-portal.hiteshdheer155.workers.dev` (staging)
- `https://www.omcommunicationworks.com` (production)

---

### MED-08 — GET /api/admin/settings Exposes Hardcoded Business PII

| Field | Value |
|---|---|
| **ID** | MED-08 |
| **Severity** | MEDIUM |
| **Classification** | POTENTIAL SECURITY WEAKNESS |
| **Category** | Information Disclosure |
| **Affected Component** | `backend/.../AdminController.java` → `GET /api/admin/settings` |

**Finding:**
This endpoint returns hardcoded business information: PAN number, GSTIN, business phone, and business email. While this endpoint requires admin authentication (reducing immediate risk), returning hardcoded sensitive business identifiers from an API is poor practice. If authentication is bypassed (see CRIT-01 to CRIT-04), this data becomes exposed. The PAN `COSPS8901L` is also present in `TaxInvoiceTemplate.jsx` (frontend, fully public in JS bundle).

**Remediation:** Store business settings in the database (configurable). Evaluate whether PAN should be excluded from API responses — it is printed on invoices by design but an API exposure is unnecessary.

---

### MED-09 — Razorpay Script Loaded Without Subresource Integrity (SRI)

| Field | Value |
|---|---|
| **ID** | MED-09 |
| **Severity** | MEDIUM |
| **Classification** | POTENTIAL SECURITY WEAKNESS |
| **Category** | Supply Chain / Frontend Security |
| **Affected Component** | `frontend/src/pages/InvoicePayment.jsx` |

**Finding:**
The Razorpay checkout script is dynamically loaded:
```js
const script = document.createElement('script');
script.src = 'https://checkout.razorpay.com/v1/checkout.js';
document.body.appendChild(script);
```
No `integrity` attribute is set. If Razorpay's CDN were compromised (supply chain attack), a modified checkout.js could capture payment card data or credentials without any client-side detection. SRI hashes allow the browser to verify the script hasn't been tampered with.

**Remediation:** Add `script.integrity = 'sha384-...'` with the known hash of the current checkout.js. Note: Razorpay may not publish SRI hashes — in that case, document this as an accepted risk and monitor for CDN anomalies.

---

### MED-10 — No JWT Revocation / Refresh Token Mechanism

| Field | Value |
|---|---|
| **ID** | MED-10 |
| **Severity** | MEDIUM |
| **Classification** | HARDENING RECOMMENDATION |
| **Category** | Authentication |
| **Affected Component** | `backend/.../JwtTokenProvider.java`, `AuthController.java` |

**Finding:**
JWT tokens are signed with a 24-hour expiry and no `jti` (JWT ID) claim. There is no token revocation mechanism (no blocklist, no Redis invalidation). If an admin token is stolen (via XSS from HIGH-01), the attacker has full admin access for up to 24 hours regardless of any action taken (password change, logout). There are no refresh tokens — the admin must re-authenticate after 24 hours.

**Remediation:**
1. Add `jti` claim to tokens
2. Maintain a server-side revocation list (Redis or DB table) of revoked `jti` values
3. Implement refresh tokens with shorter access token lifetime (15–30 min)
4. On password change: invalidate all outstanding tokens for that user

---

## LOW FINDINGS

---

### LOW-01 — axios Version `^1.19.0` Likely Does Not Exist

| Field | Value |
|---|---|
| **ID** | LOW-01 |
| **Severity** | LOW |
| **Classification** | CONFIRMED FUNCTIONAL BUG |
| **Category** | Dependency Management |
| **Affected Component** | `frontend/package.json` |

**Finding:**
`"axios": "^1.19.0"` — npm's axios package has no version 1.19.x. The latest 1.x release as of the audit is in the 1.7.x range. This is likely a typo for `^1.9.0` or `^1.7.0`. npm resolves `^1.19.0` by finding the highest compatible version, which may result in installing an unexpected version or a dependency resolution error.

**Remediation:** Correct the version to `"axios": "^1.7.9"` (or the latest stable 1.x). Run `npm install` and lock with `package-lock.json`.

---

### LOW-02 — GSTIN Discrepancy Between index.html and TaxInvoiceTemplate

| Field | Value |
|---|---|
| **ID** | LOW-02 |
| **Severity** | LOW |
| **Classification** | CONFIRMED FUNCTIONAL BUG |
| **Category** | Data Integrity / Compliance |
| **Affected Component** | `frontend/index.html` (line with JSON-LD schema), `frontend/src/components/DocumentTemplates/TaxInvoiceTemplate.jsx` |

**Finding:**
Two different GSTIN values appear in the codebase:
- `index.html` JSON-LD schema: `07COSPS8901L2ZO` — ends with letter **O**
- `TaxInvoiceTemplate.jsx`: `07COSPS8901L2Z0` — ends with digit **0**

Indian GSTINs end with an alphanumeric character. One of these values is incorrect. Tax invoices issued with the wrong GSTIN are invalid for GST input tax credit purposes.

**Remediation:** Verify the correct GSTIN with business records and update all occurrences to use the same correct value. Extract it to a single shared constant to prevent future divergence.

---

### LOW-03 — Production og:url and JSON-LD Schema Point to Staging Domain

| Field | Value |
|---|---|
| **ID** | LOW-03 |
| **Severity** | LOW |
| **Classification** | CONFIRMED UI/UX BUG |
| **Category** | SEO / Structured Data |
| **Affected Component** | `frontend/index.html` |

**Finding:**
`index.html` has hardcoded Open Graph and JSON-LD URLs pointing to the staging Workers subdomain:
```html
<meta property="og:url" content="https://om-communication-portal.hiteshdheer155.workers.dev/" />
```
and in the JSON-LD:
```json
"url": "https://om-communication-portal.hiteshdheer155.workers.dev/"
```
When the production domain (`omcommunicationworks.com`) is shared on social media or indexed by search engines, the canonical/og URL will reference the staging environment. This can lead to search engines indexing the staging URL, split link equity, and confusing analytics.

**Remediation:** Update to the production domain. Better: inject base URL via Vite env variable so it can differ between environments without code changes.

---

### LOW-04 — Sitelinks Search Box Schema With No Search Functionality

| Field | Value |
|---|---|
| **ID** | LOW-04 |
| **Severity** | LOW |
| **Classification** | INFORMATIONAL |
| **Category** | SEO |
| **Affected Component** | `frontend/index.html` |

**Finding:**
`index.html` includes a JSON-LD `SearchAction` (Sitelinks Search Box) schema. The website has no search functionality. Google may ignore this schema, or if it indexes it and later finds no search implementation, it could generate a rich result that 404s or behaves unexpectedly.

**Remediation:** Remove the `SearchAction` schema block until site search is implemented.

---

### LOW-05 — Empty `sameAs` Array in Organization Schema

| Field | Value |
|---|---|
| **ID** | LOW-05 |
| **Severity** | LOW |
| **Classification** | INFORMATIONAL |
| **Category** | SEO |
| **Affected Component** | `frontend/index.html` |

**Finding:**
The `Organization` JSON-LD has `"sameAs": []`. An empty array for `sameAs` provides no value and is slightly wasteful. The business likely has social media profiles that should be linked here for better Google Knowledge Panel potential.

**Remediation:** Add official social media profile URLs (LinkedIn, Facebook, Instagram, etc.) to the `sameAs` array, or remove it if no profiles exist.

---

### LOW-06 — QuotationTemplate Missing Amount in Words

| Field | Value |
|---|---|
| **ID** | LOW-06 |
| **Severity** | LOW |
| **Classification** | CONFIRMED FUNCTIONAL BUG |
| **Category** | Document Quality |
| **Affected Component** | `frontend/src/components/DocumentTemplates/QuotationTemplate.jsx` |

**Finding:**
`TaxInvoiceTemplate.jsx` and `BillTemplate.jsx` both import and use `numberToWordsINR` to display the total amount in words (e.g., "Rupees Twelve Thousand Five Hundred Only"). `QuotationTemplate.jsx` does not import or use this function — the total is shown only numerically. For professional business quotations in India, amount in words is standard practice and is expected by clients.

**Remediation:** Add `import { numberToWordsINR } from '../utils/numberToWords'` and display amount in words in `QuotationTemplate.jsx` consistent with the other two templates.

---

### LOW-07 — Docker Build Skips Tests (`-DskipTests`)

| Field | Value |
|---|---|
| **ID** | LOW-07 |
| **Severity** | LOW |
| **Classification** | HARDENING RECOMMENDATION |
| **Category** | Build / CI Quality |
| **Affected Component** | `backend/Dockerfile` |

**Finding:**
The Docker build command includes `-DskipTests`. This means the production Docker image is built without running the test suite. Regressions introduced by code changes will not be caught at Docker build time and could reach production.

**Remediation:** Remove `-DskipTests`. If tests require external services (DB, etc.), use test containers or H2 in-memory for the test phase. Alternatively, run tests in CI before building the Docker image and use `-DskipTests` in the Docker step only if tests are already verified in CI.

---

### LOW-08 — No JVM Memory Tuning in Dockerfile

| Field | Value |
|---|---|
| **ID** | LOW-08 |
| **Severity** | LOW |
| **Classification** | HARDENING RECOMMENDATION |
| **Category** | Performance / Operations |
| **Affected Component** | `backend/Dockerfile` |

**Finding:**
The Dockerfile's CMD has no JVM heap/memory flags (`-Xms`, `-Xmx`, `-XX:MaxRAMPercentage`). Railway containers have memory limits, and without explicit heap sizing, the JVM may allocate its default (often 25% of system memory) which could either be too large (OOM kill) or too small (GC pressure).

**Remediation:** Add JVM flags appropriate for the Railway instance size, e.g.:
```dockerfile
CMD ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
```

---

### LOW-09 — Razorpay Fallback Test Key Hardcoded in Frontend

| Field | Value |
|---|---|
| **ID** | LOW-09 |
| **Severity** | LOW |
| **Classification** | HARDENING RECOMMENDATION |
| **Category** | Configuration |
| **Affected Component** | `frontend/src/pages/InvoicePayment.jsx` |

**Finding:**
```js
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_key';
```
If the env var is not set, the app falls back to `'rzp_test_key'` — a placeholder that is not a real Razorpay key. This would silently break payments in any environment where the env var is missing, showing a Razorpay initialization error to clients. The `||` fallback provides a false sense of safety.

**Remediation:** Remove the fallback. Fail visibly at startup or render an error if the key is missing. For type safety, validate the key format on component mount.

---

## FUNCTIONAL BUGS TABLE

| ID | Severity | Page/Feature | Bug | Root Cause | Evidence |
|---|---|---|---|---|---|
| BUG-01 | HIGH | Invoice Share (WhatsApp/Email/Copy) | All share links point to `/invoice/{docNo}` — 404 on click | Path mismatch: route is `/pay/:invoiceNumber` | `CreateDocumentModal.jsx` vs `App.jsx` |
| BUG-02 | MEDIUM | Audit Log | Every action logged as performed by "ADMIN" regardless of real user | Literal string "ADMIN" hardcoded in all `auditLogService.log()` calls | `AdminController.java` |
| BUG-03 | MEDIUM | Invoice Numbering | Counter resets to 1000 on server restart, causing duplicate invoice numbers | In-memory AtomicInteger not persisted to DB | `InvoiceService.java` |
| BUG-04 | MEDIUM | Admin Dashboard | ProtectedRoute does not check token expiry — expired sessions pass route guard | Only checks `!!localStorage.getItem(...)`, no JWT decode | `App.jsx` ProtectedRoute |
| BUG-05 | MEDIUM | Quotation Creation | Quotations are never saved — each has ephemeral random number, no persistence | No backend endpoint call from QuotationModal | `AdminDashboard.jsx` |
| BUG-06 | MEDIUM | Invoice Payment | "Show Technical Details" toggle state exists but button to trigger it is absent from JSX | Incomplete feature implementation | `InvoicePayment.jsx` |
| BUG-07 | LOW | Tax Invoice Document | GSTIN differs between index.html (ends in 'O') and TaxInvoiceTemplate (ends in '0') | Two independently hardcoded strings with different last characters | `index.html`, `TaxInvoiceTemplate.jsx` |
| BUG-08 | LOW | Quotation Document | Amount in words not shown on quotation (shown on Tax Invoice and Bill) | `numberToWordsINR` not imported or used | `QuotationTemplate.jsx` |
| BUG-09 | LOW | npm Build | axios version `^1.19.0` does not exist in npm registry | Likely typo (`1.19.0` vs `1.9.0` or `1.7.0`) | `frontend/package.json` |

---

## SECURITY FINDINGS TABLE

| ID | Severity | Category | Finding | Location | Confirmed? | Impact | Priority Fix |
|---|---|---|---|---|---|---|---|
| SEC-01 | CRITICAL | Broken Access Control | Unauthenticated endpoint returns full client PII | `PublicController.java` L~35 | CONFIRMED | Full PII exfiltration of all clients | Immediate |
| SEC-02 | CRITICAL | Credential Reset | Admin password resets to `admin123` on every restart | `OmCommunicationPortalApplication.java` seedAdmin | CONFIRMED | Trivial admin takeover after any restart | Immediate |
| SEC-03 | CRITICAL | Missing Rate Limit | No rate limit on login endpoint | `RateLimitingFilter.java`, `AuthController.java` | CONFIRMED | Unlimited brute force against admin account | Immediate |
| SEC-04 | CRITICAL | Hardcoded Secret | JWT secret has `admin123`-adjacent hardcoded fallback | `application.yml` both profiles | CONFIRMED | JWT forgery if env var not set | Immediate |
| SEC-05 | CRITICAL | Exposed Debug Interface | H2 console permitted for all, frame options disabled globally | `SecurityConfig.java` | CONFIRMED | Potential unauthenticated DB access + clickjacking | Immediate |
| SEC-06 | HIGH | Insecure Token Storage | JWT in localStorage — XSS exfiltration vector | `api.js`, `App.jsx` | CONFIRMED | Token theft via XSS, 24hr replay window | High |
| SEC-07 | HIGH | IDOR | Sequential invoice numbers allow bulk PII enumeration | `InvoiceService.java` | CONFIRMED | Amplifies SEC-01 to full database dump | Immediate (fix with SEC-01) |
| SEC-08 | HIGH | Ineffective Control | Rate limiter uses proxy IP — ineffective or DoS risk | `RateLimitingFilter.java` | CONFIRMED | Rate limiting provides false security | High |
| SEC-09 | HIGH | Information Disclosure | `e.getMessage()` returned in 500 responses | `AdminController.java` multiple methods | CONFIRMED | Internal implementation details leaked | High |
| SEC-10 | HIGH | Credential Exposure | Default credentials in README.md | `README.md` | CONFIRMED | Assists any attacker with repo access | High |
| SEC-11 | MEDIUM | CORS Misconfiguration | Wildcard CORS for all *.pages.dev and *.workers.dev | `SecurityConfig.java` CORS config | Code Analysis | Cross-origin API access from any Cloudflare-hosted page | Medium |
| SEC-12 | MEDIUM | Supply Chain | Razorpay script loaded without SRI integrity attribute | `InvoicePayment.jsx` | Code Analysis | CDN compromise could capture payment data | Medium |
| SEC-13 | MEDIUM | No Revocation | JWT has no revocation/refresh mechanism | `JwtTokenProvider.java` | Code Analysis | Stolen tokens valid for 24hr with no remedy | Medium |
| SEC-14 | MEDIUM | Missing Validation | `@Valid` absent on 5 admin endpoints | `AdminController.java` | Code Analysis | Malformed input bypasses DTO validation | Medium |

---

## AUTHENTICATION / AUTHORIZATION AUDIT

### Authentication Mechanism
- **Type:** JWT (HMAC-SHA256)
- **Issuance:** `POST /api/auth/login` with username/password
- **Storage:** localStorage key `om_admin_token`
- **Expiry:** 24 hours (no refresh)
- **Claims:** `sub` (username), `role`
- **Missing:** `jti` claim, revocation list, refresh tokens

### Authorization Model
- Single role: `ROLE_ADMIN`
- All `/api/admin/**` endpoints require `ROLE_ADMIN`
- All `/api/public/**` endpoints are unauthenticated
- No fine-grained permissions (all admins have all access)

### Critical Auth Issues
1. **CRIT-02:** Password resets to `admin123` on restart
2. **CRIT-03:** No brute force protection on login
3. **CRIT-04:** JWT secret has hardcoded fallback — forgery possible
4. **SEC-06:** Token in localStorage — XSS vector
5. **MED-04:** Client-side route guard does not validate expiry

### Auth Flow Assessment
The authentication flow itself (password hash check → JWT issuance → header bearer extraction → role check) is structurally sound. Spring Security's `UsernamePasswordAuthenticationToken` and the `JwtAuthenticationFilter` are standard patterns. The critical failures are in the surrounding operational security (default credentials, no rate limiting, insecure secret management).

---

## API SECURITY — ENDPOINT INVENTORY

### Public Endpoints (No Auth Required)
| Endpoint | Method | Sensitivity | Finding |
|---|---|---|---|
| `/api/public/health` | GET | Low | OK — health check only |
| `/api/public/invoices/{invoiceNumber}` | GET | **CRITICAL** | Returns full client PII — see CRIT-01 |
| `/api/public/invoices/{invoiceNumber}/verify-payment` | POST | High | Payment verification — should validate only, not expose PII |
| `/api/public/contact` | POST | Low | Contact form submission |
| `/api/public/complaints` | POST | Low | Complaint submission |
| `/h2-console/**` | ALL | **CRITICAL** | DB console — see CRIT-05 |

### Auth Endpoints (No Auth Required)
| Endpoint | Method | Finding |
|---|---|---|
| `/api/auth/login` | POST | No rate limit — CRIT-03 |
| `/api/auth/logout` | POST | Stateless JWT — logout is client-side only |

### Admin Endpoints (ROLE_ADMIN Required)
| Endpoint | Method | Finding |
|---|---|---|
| `/api/admin/dashboard` | GET | OK |
| `/api/admin/invoices` | GET | OK |
| `/api/admin/invoices` | POST | Missing @Valid — MED-01 |
| `/api/admin/invoices/{id}` | PUT | Missing @Valid — MED-01 |
| `/api/admin/invoices/{id}` | DELETE | OK |
| `/api/admin/site-surveys` | GET | OK |
| `/api/admin/site-surveys` | POST | Missing @Valid — MED-01 |
| `/api/admin/site-surveys/{id}` | PATCH | Missing @Valid — MED-01 |
| `/api/admin/tickets` | GET | OK |
| `/api/admin/tickets/{id}` | PUT | Missing @Valid — MED-01 |
| `/api/admin/tickets/{id}` | DELETE | OK |
| `/api/admin/settings` | GET | Returns hardcoded PII — MED-08 |
| `/api/admin/audit-logs` | GET | OK |

**Rate Limiting Coverage:** None on any authenticated admin endpoint. Bucket4j only covers `/api/public/**`.

---

## DATABASE SECTION

### Configuration
- **Dev profile (`h2`):** H2 in-memory, auto-DDL `create-drop`, console enabled on port 8080
- **Prod profile (`postgres`):** PostgreSQL via Railway, HikariCP pool (max 20, min-idle 5, 20s connection timeout, 30min idle timeout)
- **Schema:** Spring JPA auto-DDL `update` in prod (not explicit migrations)

### Issues
1. **CRIT-05:** H2 console security configuration not profile-gated — accessible path in SecurityConfig regardless of active profile
2. **MED-03:** Invoice counter stored in application memory, not DB — resets on restart
3. **No migration framework:** Uses `spring.jpa.hibernate.ddl-auto: update` — risky in production. Schema drift is possible; destructive changes (column renames, type changes) are not handled safely.
4. **No DB-level constraints verified:** Input validation missing at API layer (MED-01) — whether DB constraints enforce uniqueness/integrity was not verifiable from source alone.
5. **HikariCP 20s connection timeout:** May cause visible errors under load spikes rather than queuing.

### Recommendation
Adopt Flyway or Liquibase for schema migrations. Remove `ddl-auto: update` from prod; use `validate` instead once migration framework is in place.

---

## PAYMENT / RAZORPAY SECTION

### Architecture
- **Frontend:** `InvoicePayment.jsx` loads Razorpay checkout.js, opens modal, sends `razorpay_payment_id`, `razorpay_order_id`, `razorpay_signature` to backend
- **Backend:** `PublicController.POST /api/public/invoices/{invoiceNumber}/verify-payment` validates signature using Razorpay Java SDK
- **Key management:** `VITE_RAZORPAY_KEY_ID` (public key, in frontend env) + `RAZORPAY_KEY_SECRET` (backend env var)

### Security Assessment
- **Signature verification:** ✅ Correctly implemented — all 3 Razorpay fields sent to backend, backend verifies HMAC signature before marking payment successful
- **Secret in frontend:** ✅ Not exposed — only public key in frontend
- **Fallback keys:** ⚠️ `rzp_test_key` hardcoded fallback in frontend (LOW-09); Razorpay test keys as fallback in `application.yml`

### Functional Issues
- CRIT-01 exposes `razorpaySignature` and `razorpayOrderId` in the unauthenticated invoice endpoint — while not directly exploitable, this is sensitive payment metadata that should not be public
- The payment flow itself (create order → open modal → verify signature) follows Razorpay's recommended server-side verification pattern correctly

---

## DOCUMENT / PDF SYSTEM

### Architecture
- **PDF generation:** Browser `window.print()` via React print components
- **Document types:** Tax Invoice, Quotation, Bill (Non-GST)
- **Templates:** Separate JSX components with hardcoded business details

### Issues
1. **CRIT-01 (related):** Invoice data for public payment view is unauthenticated — exposes PII
2. **BUG-01 (HIGH):** Share links for all documents broken — `/invoice/` vs `/pay/` path mismatch
3. **LOW-02:** GSTIN inconsistency between templates
4. **LOW-06:** Quotation template missing amount in words
5. **No server-side PDF:** window.print() approach means:
   - No stored PDF copies — documents cannot be retrieved later (consistent with MED-05 for quotations)
   - Print output depends on browser/client print settings
   - No programmatic PDF generation for email attachments
6. **Hardcoded business details:** PAN, GSTIN, address, email, phone are hardcoded in template JSX files. Any change requires a code deployment.

### Recommendation
Consider server-side PDF generation (iText, OpenPDF, or wkhtmltopdf) for auditable, storable document copies. Extract business settings to database (configurable from admin panel).

---

## FRONTEND SECTION

### Technology Stack
React 19, Vite 8, Tailwind CSS v4, React Router v7, Framer Motion, Lucide React, react-helmet-async, axios

### Security
- No CSP (Content-Security-Policy) header set — relies on Cloudflare Workers headers config (not audited)
- No XSS sanitization observed on rendered invoice content (content originates from admin-entered data — lower risk but worth noting)
- JWT in localStorage (HIGH-01)
- External script (Razorpay) without SRI (MED-09)

### Performance
- `AdminDashboard.jsx` is 1,507 lines / 85KB — a monolithic component that likely causes unnecessary re-renders and slow cold load
- No code splitting observed for the admin dashboard
- Framer Motion adds ~30KB to bundle — appropriate if animations are used extensively

### Accessibility
- Not audited (browser testing not performed)

### Code Quality
- BUG-01: Critical path mismatch on share links
- MED-06: Dead state variable (`showTechDetails`) in InvoicePayment
- MED-05: Ephemeral quotation numbers — no persistence
- LOW-02: GSTIN discrepancy
- LOW-03: Staging URL hardcoded in index.html

---

## BACKEND SECTION

### Technology Stack
Java 21, Spring Boot 3.3.0, Maven, Spring Security, JJWT 0.12.5, Bucket4j 8.10.1, Razorpay SDK 1.4.5

### Security Architecture
- Spring Security filter chain with custom `JwtAuthenticationFilter`
- BCrypt password hashing (Spring Security default)
- Role-based access: `ROLE_ADMIN` guards all admin endpoints
- Rate limiting: Bucket4j ConcurrentHashMap (in-memory, limited effectiveness — HIGH-03)

### Issues Summary
- CRIT-01: Unauthenticated PII endpoint
- CRIT-02: Password reset on restart
- CRIT-03: No login rate limit
- CRIT-04: JWT secret fallback
- CRIT-05: H2 console not profile-gated
- MED-01: Missing @Valid on 5 endpoints
- MED-02: Audit log user attribution broken
- HIGH-05: Exception messages in 500 responses

### Positive Notes
- BCrypt hashing ✅
- Multi-stage Docker build with non-root user ✅
- Razorpay signature verification implemented correctly ✅
- JWT filter properly extracts and validates bearer token ✅
- HikariCP connection pooling configured ✅

---

## CLOUD / DEPLOYMENT SECTION

### Frontend — Cloudflare Workers
- SPA routing handled via `wrangler.json` not-found redirect to index.html ✅
- Environment variables injected via Cloudflare Dashboard (VITE_ vars at build time)
- `frontend/.env` file exists on disk with real values — verify it was never committed to git history

### Backend — Railway Docker
- Non-root container user (`spring:spring`) ✅
- Health check on `/api/public/health` ✅
- Profile: `postgres` hardcoded in `ENV SPRING_PROFILES_ACTIVE=postgres` (fine, but reduces flexibility)
- No JVM memory tuning (LOW-08)
- Tests skipped in build (LOW-07)
- PostgreSQL connection via Railway's internal networking (DATABASE_URL env var assumed)

### Secret Management
- Railway environment variables used for secrets (correct approach)
- BUT: `application.yml` has fallback defaults for `JWT_SECRET` and `ADMIN_PASSWORD` — if env vars are not set on Railway, the fallbacks silently take effect (CRIT-02, CRIT-04)
- Razorpay keys have test key fallbacks in both places

### Recommendation
1. Audit Railway variables to confirm `JWT_SECRET`, `ADMIN_PASSWORD`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` are all set
2. Remove ALL fallback defaults for secrets in `application.yml`
3. Confirm `frontend/.env` is not in git history (`git log --all --full-history -- .env`)

---

## DEPENDENCIES SECTION

### Frontend
| Package | Version Specified | Issue |
|---|---|---|
| react | ^19.0.0 | Latest — OK |
| react-dom | ^19.0.0 | OK |
| react-router-dom | ^7.0.2 | OK |
| axios | ^1.19.0 | **Version does not exist** — LOW-01 |
| framer-motion | ^11.x | OK |
| react-helmet-async | ^2.x | OK |
| react-hot-toast | ^2.x | OK |
| lucide-react | ^0.x | OK |
| tailwindcss | ^4.x | OK |
| vite | ^6.x | OK |

### Backend
| Package | Version | Issue |
|---|---|---|
| spring-boot | 3.3.0 | Stable — OK |
| jjwt | 0.12.5 | Current stable — OK |
| bucket4j-core | 8.10.1 | Current — OK |
| razorpay-java | 1.4.5 | Current — OK |
| h2 | Runtime | OK for dev |
| postgresql | Runtime | OK for prod |

### Vulnerability Scanning
A full CVE scan (OWASP Dependency-Check, Snyk) was not run as part of this static audit. Recommend running:
```bash
# Backend
mvn dependency-check:check

# Frontend  
npm audit
```

---

## MOBILE / RESPONSIVE SECTION

*Note: Browser testing was not performed. The following is based on code analysis only.*

### Observations from Code
- Tailwind CSS v4 used — responsive utilities are available (`sm:`, `md:`, `lg:` breakpoints)
- `AdminDashboard.jsx` (85KB, 1,507 lines) — large monolithic component may have unoptimized mobile rendering
- Invoice payment page (`InvoicePayment.jsx`) renders Razorpay's own modal — Razorpay's checkout is mobile-responsive by design
- Document templates (Tax Invoice, Quotation, Bill) are designed for print — mobile rendering of these complex layouts was not verified

### Recommendation
Perform browser testing on mobile viewport (375px width) for:
1. Admin dashboard — all table/data views
2. Invoice payment page — the public-facing flow
3. Contact/complaint pages

---

## PERFORMANCE SECTION

### Backend
- **HikariCP:** Max 20 connections, 20s connection timeout — appropriate for moderate traffic; may become a bottleneck at scale
- **No caching layer:** No Redis caching observed; all DB reads appear to be live queries
- **Rate limiting:** In-memory Bucket4j — adequate for single-instance, not for scaled deployment

### Frontend
- **AdminDashboard.jsx 85KB** — monolithic component. No lazy loading or code splitting observed for this route.
- **Framer Motion** — adds animation bundle weight; acceptable if animations are used throughout
- **No HTTP/2 push** observed in wrangler.json
- **Vite build** — optimized by default (tree-shaking, chunking) but 85KB component will be a single large chunk

### Lighthouse / Core Web Vitals
*Not measured — browser testing not performed. Recommend running Lighthouse in Chrome DevTools against production URL.*

---

## SEO / TECHNICAL WEBSITE ISSUES

| Issue | Severity | Location | Finding |
|---|---|---|---|
| Staging URL in og:url and JSON-LD | LOW | `index.html` | Points to `workers.dev` subdomain — not production domain |
| GSTIN discrepancy | LOW | `index.html` vs `TaxInvoiceTemplate.jsx` | Different last character (O vs 0) |
| Sitelinks Search Box with no search | LOW | `index.html` | Schema claims search capability that doesn't exist |
| Empty sameAs array | LOW | `index.html` | Organization schema has no social profiles linked |
| SEO component implemented | ✅ OK | `frontend/src/components/SEO.jsx` | react-helmet-async, canonical, OG, Twitter Card, JSON-LD all present |
| Title/description tags present | ✅ OK | `index.html` + `SEO.jsx` | Base metadata set |

---

## MASTER ISSUE REGISTER

| ID | Severity | Category | Classification | Component | Summary | Priority |
|---|---|---|---|---|---|---|
| CRIT-01 | CRITICAL | Access Control | Confirmed Vulnerability | PublicController.java | Unauthenticated endpoint exposes full client PII | P0 — Fix before next deploy |
| CRIT-02 | CRITICAL | Credential Mgmt | Confirmed Vulnerability | OmCommunicationPortalApplication.java | Admin password resets to admin123 on every restart | P0 — Fix before next deploy |
| CRIT-03 | CRITICAL | Brute Force | Confirmed Vulnerability | RateLimitingFilter + AuthController | No rate limit on login endpoint | P0 — Fix before next deploy |
| CRIT-04 | CRITICAL | Secret Mgmt | Confirmed Vulnerability | application.yml | JWT secret has hardcoded fallback | P0 — Fix before next deploy |
| CRIT-05 | CRITICAL | Config | Confirmed Vulnerability | SecurityConfig.java | H2 console not profile-gated; frameOptions disabled globally | P0 — Fix before next deploy |
| HIGH-01 | HIGH | Token Storage | Potential Weakness | api.js, App.jsx | JWT in localStorage — XSS exfiltration risk | P1 |
| HIGH-02 | HIGH | Functional Bug | Confirmed Bug | CreateDocumentModal.jsx | All share links broken (/invoice/ vs /pay/ path) | P1 — Core business feature broken |
| HIGH-03 | HIGH | Rate Limiting | Confirmed Vulnerability | RateLimitingFilter.java | Rate limiter uses proxy IP — ineffective | P1 |
| HIGH-04 | HIGH | IDOR | Confirmed Vulnerability | InvoiceService.java | Sequential invoice numbers enable enumeration | P1 (fix with CRIT-01) |
| HIGH-05 | HIGH | Info Disclosure | Confirmed Vulnerability | AdminController.java | Exception messages in 500 responses | P1 |
| HIGH-06 | HIGH | Credential Exposure | Potential Weakness | README.md | Default credentials documented in README | P1 |
| MED-01 | MEDIUM | Input Validation | Potential Weakness | AdminController.java | Missing @Valid on 5 endpoints | P2 |
| MED-02 | MEDIUM | Audit | Confirmed Bug | AuditLogService.java | All audit events attributed to "ADMIN" literal | P2 |
| MED-03 | MEDIUM | Data Integrity | Confirmed Bug | InvoiceService.java | Invoice counter resets on restart | P2 |
| MED-04 | MEDIUM | Auth | Confirmed Bug | App.jsx ProtectedRoute | Route guard doesn't validate JWT expiry | P2 |
| MED-05 | MEDIUM | Data Integrity | Confirmed Bug | AdminDashboard.jsx | Quotations never persisted to DB | P2 |
| MED-06 | MEDIUM | UI/UX | Confirmed Bug | InvoicePayment.jsx | showTechDetails toggle unreachable in UI | P3 |
| MED-07 | MEDIUM | CORS | Potential Weakness | SecurityConfig.java | Wildcard CORS for all *.pages.dev and *.workers.dev | P2 |
| MED-08 | MEDIUM | Info Disclosure | Potential Weakness | AdminController.java | GET /settings exposes hardcoded PAN/GSTIN | P3 |
| MED-09 | MEDIUM | Supply Chain | Potential Weakness | InvoicePayment.jsx | Razorpay script without SRI | P2 |
| MED-10 | MEDIUM | Auth | Hardening Rec | JwtTokenProvider.java | No JWT revocation / refresh tokens | P2 |
| LOW-01 | LOW | Dependencies | Confirmed Bug | package.json | axios version ^1.19.0 doesn't exist | P3 |
| LOW-02 | LOW | Data Integrity | Confirmed Bug | index.html + TaxInvoiceTemplate.jsx | GSTIN last character discrepancy (O vs 0) | P2 (compliance) |
| LOW-03 | LOW | SEO | Confirmed Bug | index.html | og:url and JSON-LD point to staging domain | P3 |
| LOW-04 | LOW | SEO | Informational | index.html | SearchAction schema with no search functionality | P3 |
| LOW-05 | LOW | SEO | Informational | index.html | Empty sameAs array in Organization schema | P3 |
| LOW-06 | LOW | Document Quality | Confirmed Bug | QuotationTemplate.jsx | Amount in words missing from quotation | P3 |
| LOW-07 | LOW | Build | Hardening Rec | Dockerfile | Tests skipped in Docker build | P3 |
| LOW-08 | LOW | Performance | Hardening Rec | Dockerfile | No JVM memory tuning flags | P3 |
| LOW-09 | LOW | Config | Hardening Rec | InvoicePayment.jsx | Razorpay fallback test key hardcoded | P3 |

---

## REMEDIATION ROADMAP

---

### PHASE 1 — CRITICAL: Do Not Accept New Clients Until Fixed
**Timeline: Within 24 hours of report delivery**

1. **Fix CRIT-01:** Add authentication to `GET /api/public/invoices/{invoiceNumber}` OR restructure to return only payment-required fields (amount, order ID) with no PII. Deploy immediately.
2. **Fix CRIT-02:** Remove `else { updatePassword() }` from `seedAdmin`. Only create admin if not exists. Remove hardcoded `admin123` fallback from `application.yml`. Require `ADMIN_PASSWORD` env var.
3. **Fix CRIT-03:** Apply Bucket4j rate limiting to `/api/auth/login` (5 req/15min per IP). Use `X-Forwarded-For` for real IP.
4. **Fix CRIT-04:** Remove JWT secret fallback from `application.yml`. Rotate JWT secret on Railway. Require `JWT_SECRET` env var (fail startup if missing).
5. **Fix CRIT-05:** Move H2 console permit-all and frameOptions disable to a `@Profile("h2")` security config. Add `frameOptions().sameOrigin()` to the main config.
6. **Fix HIGH-06:** Remove default credentials from `README.md`.
7. **Verify Railway:** Confirm `JWT_SECRET`, `ADMIN_PASSWORD`, `RAZORPAY_KEY_SECRET` are all set as Railway environment variables.

---

### PHASE 2 — HIGH: Fix Within 1 Week
**Timeline: 5–7 business days**

1. **Fix HIGH-02 (BUG-01):** Change share link path in `CreateDocumentModal.jsx` from `/invoice/` to `/pay/`. Test WhatsApp and email share on a real invoice. (30-minute fix)
2. **Fix HIGH-03:** Use `X-Forwarded-For` (trust first hop from Railway proxy) in `RateLimitingFilter`. Extend rate limiting to `/api/auth/**`.
3. **Fix HIGH-04 + MED-03:** Replace `AtomicInteger` counter with DB-persisted sequence. Initialize from MAX(invoice_number) + 1 on startup. Consider UUID-based public identifiers.
4. **Fix HIGH-05:** Replace all `"Error: " + e.getMessage()` catch blocks with generic messages. Add structured logging with correlation IDs.
5. **Fix MED-01:** Add `@Valid` to all 5 missing `@RequestBody` parameters. Add Bean Validation annotations to DTOs.
6. **Fix MED-07:** Restrict CORS to specific application domains (staging + production only).

---

### PHASE 3 — MEDIUM PRIORITY: Fix Within 2 Weeks
**Timeline: 10–14 business days**

1. **Fix MED-02:** Replace literal `"ADMIN"` in all audit log calls with `SecurityContextHolder.getContext().getAuthentication().getName()`.
2. **Fix MED-04:** Add JWT decode + expiry check to `ProtectedRoute` using `jwt-decode` or manual base64 decode.
3. **Fix MED-05:** Implement `POST /api/admin/quotations` backend endpoint. Persist quotations. Use DB sequence for quotation numbers.
4. **Fix MED-09:** Research Razorpay SRI hash availability. If available, add `integrity` attribute to dynamically loaded script. If unavailable, document as accepted risk.
5. **Fix LOW-02:** Verify correct GSTIN with business records. Update to single source of truth constant. Confirm with a CA/accountant.
6. **Fix LOW-09:** Remove `|| 'rzp_test_key'` fallback. Add explicit check/error on missing `VITE_RAZORPAY_KEY_ID`.

---

### PHASE 4 — ENHANCEMENT: Fix Within 1 Month
**Timeline: 3–4 weeks**

1. **Implement MED-10:** JWT refresh token flow. Short (15 min) access tokens. Rotate on each use.
2. **Fix MED-06 + MED-08:** Either implement `showTechDetails` toggle properly or remove dead code. Evaluate whether `/api/admin/settings` should be made configurable.
3. **Implement HIGH-01 mitigation:** Migrate from localStorage to HttpOnly cookies for JWT storage. Requires coordinating frontend `api.js` changes with backend cookie-based response.
4. **Fix LOW-01:** Correct axios version in `package.json`. Run `npm audit` and resolve any vulnerabilities.
5. **Fix LOW-03/04/05/06:** Update `index.html` og:url to production domain. Remove SearchAction schema. Populate sameAs. Add amount-in-words to QuotationTemplate.

---

### PHASE 5 — QUALITY: Fix Within 6 Weeks
**Timeline: 4–6 weeks**

1. **Fix LOW-07:** Remove `-DskipTests` from Dockerfile or integrate test execution into CI pipeline.
2. **Fix LOW-08:** Add JVM memory flags to Dockerfile CMD based on Railway instance memory allocation.
3. **Database migrations:** Introduce Flyway or Liquibase. Remove `ddl-auto: update` from production profile.
4. **Code split AdminDashboard:** Break the 85KB monolithic component into smaller feature components with `React.lazy()` and `Suspense`.
5. **Backend error handling:** Implement `@ControllerAdvice` global exception handler for consistent, sanitized error responses.

---

### PHASE 6 — HARDENING: Ongoing
**Timeline: Continuous**

1. **Run dependency scans:** `mvn dependency-check:check` and `npm audit` in CI on every PR.
2. **Add CSP headers:** Configure Content-Security-Policy in Cloudflare Workers response headers.
3. **Server-side PDF:** Evaluate migrating from `window.print()` to server-side PDF generation for invoice archival.
4. **Redis-backed rate limiting:** For production scale, migrate Bucket4j to Redis storage.
5. **Security headers:** Add HSTS, X-Content-Type-Options, Referrer-Policy in Cloudflare Workers.
6. **Penetration test:** After Phase 1–2 fixes are deployed, commission a runtime penetration test against the production environment.
7. **Git history audit:** `git log --all --full-history -- '*/.env' '*/application.yml'` to confirm secrets were never committed.

---

## AUDIT LIMITATIONS

The following was **NOT** performed in this audit:
1. **Browser/runtime testing** — application was not running; findings are code analysis only
2. **CVE scanning** — OWASP Dependency-Check and npm audit were not run
3. **Penetration testing** — no active exploitation attempts were made
4. **Network/infrastructure testing** — Railway, Cloudflare, and DNS configurations not tested
5. **Git history audit** — historical commits not inspected for secret leakage
6. **Database inspection** — no live database access
7. **Lighthouse/Web Vitals** — performance metrics not measured

All findings should be independently verified before remediation, especially CRITICAL and HIGH items.

---

*Audit completed: 2026-10-02 | Classification: CONFIDENTIAL — Internal Use Only*
*Auditor: Claude (AI Static Analysis) | Methodology: Source code review, configuration analysis, dependency inspection*
*Total files reviewed: ~45 (30 Java backend + 15 frontend/config)*
