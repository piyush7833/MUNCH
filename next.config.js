/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            "images.pexels.com",
            "www.google.com",
            "img-global.cpcdn.com",
            "www.iwmbuzz.com",
            "upload.wikimedia.org"
              //by default next js not support any external domain acess we need to configure it
        ]
    }
    
}

module.exports = nextConfig
