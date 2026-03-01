<?php
/**
 * Plugin Name: TP Digital Headless SEO Redirects
 * Description: Redirects public frontend requests on the WP admin subdomain to the canonical Next.js / React domain frontend and enforces X-Robots-Tag noindex for the admin domain.
 * Version: 1.0.0
 * Author: True Path Digital (Senior Engineer)
 */

add_action('parse_request', 'tp_headless_seo_enforcement', 1);

function tp_headless_seo_enforcement() {
    // Check if it's the admin subdomain
    $host = $_SERVER['HTTP_HOST'];
    if ($host !== 'admin.truepath406.com') {
        return;
    }

    $request_uri = $_SERVER['REQUEST_URI'];
    
    // Ignore early static/API/admin paths.
    // The regular expressions match patterns that should NOT be redirected.
    $ignored_paths = array(
        '#^/wp-admin($|/)#',
        '#^/wp-login\.php#',
        '#^/graphql($|/)#',
        '#^/wp-json($|/)#',
        '#^/xmlrpc\.php#',
        '#^/wp-content/(.*)#',
        '#^/wp-includes/(.*)#',
        '#^/robots\.txt#',
        '#^/sitemap(_index)?.*\.xml#'
    );

    $should_ignore = false;
    foreach ($ignored_paths as $pattern) {
        if (preg_match($pattern, $request_uri)) {
            $should_ignore = true;
            break;
        }
    }

    // Step B: Set X-Robots-Tag to noindex for admin processes
    if (!headers_sent()) {
        header('X-Robots-Tag: noindex, nofollow', true);
    }

    // Step A: If it's not a protected path, redirect it to canonical frontend (like /blog/{slug})
    if (!$should_ignore && $request_uri !== '/' && $request_uri !== '') {
        // Remove trailing slash safely for query
        $slug = trim(parse_url($request_uri, PHP_URL_PATH), '/');
        
        // Since all public posts go to /blog/{slug} on frontend
        $redirect_url = 'https://truepath406.com/blog/' . $slug;

        wp_redirect($redirect_url, 301);
        exit;
    }
}
