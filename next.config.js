/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STAGING_ALCHEMY_KEY:
      "https://eth-rinkeby.alchemyapi.io/v2/6JcQha9d2DX-5wfQkfJ5x2i5kCWdmwwa",
  },
};

module.exports = nextConfig
