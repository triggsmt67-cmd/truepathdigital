
## Deployment & DNS Troubleshooting (Updated 2026-03-16)

### Domain Configuration

| Domain | Status | Hosting Provider | Notes |
| :--- | :--- | :--- | :--- |
| **`truepath406.com`** | ✅ **Active** | **Hostinger** (DNS → Vercel) | Primary domain. Displays the live site via Vercel. |
| **`admin.truepath406.com`** | ✅ **Active** | **Hostinger** | WordPress backend (headless CMS). Serves GraphQL API at `/graphql`. |

### Vercel Deployment
- **Vercel Project**: `truepathdigital`
- **GitHub Repo**: `triggsmt67-cmd/truepathdigital`
- Domain `truepath406.com` DNS is managed on Hostinger, pointed to Vercel (`76.76.21.21`).

### How to Fix `admin.truepath406.com` (Backend)
If the WordPress backend becomes unreachable, it may be a DNS issue:

1.  **Find your Hostinger IP Address:**
    *   Log in to Hostinger hPanel.
    *   Go to **Hosting** -> **Manage**.
    *   Look for **Website Details** on the left.
    *   Copy the **Website IP Address** (e.g., `123.456.78.90`).
2.  **Update DNS for `admin`:**
    *   Go to **Domains** -> **DNS / Nameservers**.
    *   Find the **A Record** for `admin`.
    *   **Edit** it to point to your **Hostinger IP Address** (NOT Vercel's 76.76.21.21).
    *   If you don't have an `admin` record, create an A record for `admin` pointing to the Hostinger IP.

*Once this is fixed, your blog posts and images will reappear automatically.*
