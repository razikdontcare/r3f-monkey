/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Gunakan protokol yang sesuai (https atau http)
        hostname: 'imagedelivery.net', // Ganti dengan hostname Cloudflare Anda
        port: '', // Biarkan kosong jika menggunakan port default (80/443)
        pathname: '/<account-hash>/**', // Path gambar. Gunakan wildcard untuk semua path.
      },
    ],
  },
};

export default nextConfig;
