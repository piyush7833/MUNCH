/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            "firebasestorage.googleapis.com"
        ]
    }
    
}

module.exports = nextConfig

// next.config.js
// const withTM = require('next-transpile-modules')(['next-cors']);

// module.exports = withTM({
//   async headers() {
//     return [
//       {
//         source: '/api/upload-image',
//         headers: [
//           {
//             key: 'Access-Control-Allow-Origin',
//             value: '*', // Change to your frontend URL
//           },
//         ],
//       },
//     ];
//   },
// });
