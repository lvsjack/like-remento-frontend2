const nextConfig = {
    reactStrictMode: false, // changed this to false
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    images: {
        domains: [
            'images.unsplash.com',
            'i.ibb.co',
            'scontent.fotp8-1.fna.fbcdn.net',
            'avatar.iran.liara.run'
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/**',
            },
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
                port: '',
                pathname: '**',
            },
        ],
    },
};

module.exports = nextConfig;
