/** @type {import('next').NextConfig} */
const nextConfig = {
    // ⚠️ Tell Next to ignore any TS errors during build
    typescript: {
        ignoreBuildErrors: true,
    },

    // ⚠️ Tell Next to ignore any ESLint errors during build
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
