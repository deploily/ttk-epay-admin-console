/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",  // <=== enables static exports
    trailingSlash: true,
    reactStrictMode: true,
    images: {
        unoptimized: true, // <== disables Next.js image optimization
      },
};

export default nextConfig;
