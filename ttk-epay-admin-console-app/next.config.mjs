/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        unoptimized: true, // required for GitHub Pages
    },
    // Only apply these in production (GitHub Pages)
    ...(process.env.NODE_ENV === "production"
        ? {
            basePath: "/ttk-epay-admin-console",
            assetPrefix: "/ttk-epay-admin-console/",
            output: "export",
        }
        : {}),
    
};

export default nextConfig;
