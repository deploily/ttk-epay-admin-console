/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/ttk-epay-admin-console",
    output: "export",
    trailingSlash: true,
    reactStrictMode: true,
    assetPrefix: "/ttk-epay-admin-console/",
    images: {
        unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization
    },
    publicRuntimeConfig: {
        basePath: "/ttk-epay-admin-console",
    },
};

export default nextConfig;
