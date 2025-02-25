module.exports = {
    siteUrl: process.env.SITE_URL || "http://localhost:3000",
    generateRobotsTxt: true, // Generate robots.txt automatically
    sitemapSize: 5000,
    changefreq: "monthly", // Tell search engines how often the content changes
    priority: 0.7, // Set default priority for pages
    exclude: ["/admin","/admin/*", "/api/*"], // Exclude private or API routes
    robotsTxtOptions: {
      policies: [
        {
          userAgent: "*",
          allow: ["/", "careers"],
          disallow: ["/admin/","/admin", "/api/*"],
        },
      ]
    },
  };
  