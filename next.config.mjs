/** @type {import('next').NextConfig} */

import withSvgr from "next-svgr";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "eftd-bucket.s3.eu-west-3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // output: "export",
};

export default withSvgr(nextConfig);
