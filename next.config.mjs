/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: "http://127.0.0.1:8000/api",
        IMAGE_URL: "http://127.0.0.1:8000/storage/",
    },
};

export default nextConfig;
