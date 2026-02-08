
## Deployment & DNS Troubleshooting (2026-02-08)

### Is My Site Updated?
**Yes**, the code is deployed correctly to Vercel, but your domains might be pointing to different servers.

| Domain | Status | Hosting Provider | Notes |
| :--- | :--- | :--- | :--- |
| **`truepath406.com`** | ✅ **Correct** | **Vercel** | Displays the latest React app (v0.0.1) with working Blog and Routing. |
| **`truepathdigital.com`** | ❌ **Incorrect** | **Bluehost (WordPress)** | Points to the old WordPress site. Does NOT show the new app. |

### How to Fix `truepathdigital.com` (Hostinger Specific)
Since you are using Hostinger, follow these steps to point your domain to Vercel:

1.  **Log in** to your [Hostinger hPanel](https://hpanel.hostinger.com/).
2.  Click on **Domains** in the top menu and select `truepathdigital.com`.
3.  Click on **DNS / Nameservers** in the left sidebar.
4.  **Delete existing A Records:**
    *   Look for Records of type **A** with the name **@** (or blank).
    *   Delete them (these point to your old host).
5.  **Add New A Record:**
    *   **Type:** `A`
    *   **Name:** `@`
    *   **Points to:** `76.76.21.21`
    *   **TTL:** Leave as default (e.g., 14400 or 3600).
    *   Click **Add Record**.
6.  **Update CNAME Record:**
    *   Look for the **CNAME** record with name **www**.
    *   Edit it (or delete and re-add) to point to: `cname.vercel-dns.com`.

*Note: DNS propagation can take up to 24-48 hours, but often happens within minutes on Hostinger.*

### How to Fix `admin.truepath406.com` (CRITICAL: Backend Error)
You are receiving a `404: NOT_FOUND / DEPLOYMENT_NOT_FOUND` error because your backend domain (`admin.truepath406.com`) is pointing to **Vercel** instead of your **WordPress Host (Hostinger)**. Vercel cannot run PHP/WordPress directly.

**Steps to Fix:**
1.  **Find your Hostinger IP Address:**
    *   Log in to Hostinger hPanel.
    *   Go to **Hosting** -> **Manage**.
    *   Look for **Website Details** on the left.
    *   Copy the **Website IP Address** (e.g., `123.456.78.90`).
2.  **Update DNS for `admin`:**
    *   Go to **Domains** -> **DNS / Nameservers**.
    *   Find the **A Record** for `admin`.
    *   **Edit** it to point to your **Hostinger IP Address** (NOT Vercel's 76.76.21.21).
    *   If you don't have an `admin` record, verify where your WordPress site is actually installed. If it's on a subdomain, create an A record for `admin` pointing to the Hostinger IP.

*Once this is fixed, your blog posts and images will reappear automatically.*
