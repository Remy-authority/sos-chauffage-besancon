/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 1600 ajouté aux largeurs par défaut : le téléphone de référence (photo du bloc 1 sur 880 px,
  // densité 1,75) reçoit 1 600 px au lieu de 1 920 (mise à jour n°1, 18/10/2026).
  images: { deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048, 3840] },
}
module.exports = nextConfig
