/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lineup.dahk.am'],
    },
    env: {
        API_URL: "https://lineup.dahk.am/api",
        IMAGE_URL: "https://lineup.dahk.am/storage1/",
    }
};

export default nextConfig;
