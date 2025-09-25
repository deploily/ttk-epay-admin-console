/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/ttk-epay-admin-console",
    output: "export",  
    // trailingSlash: true,
    reactStrictMode: true,
    assetPrefix:'/ttk-epay-admin-console/',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
