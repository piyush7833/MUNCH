import { useRouter } from 'next/router';
type dataType={
    title: string;
    description: string;
    imgUrl:string
    
}
const generateMetaTags =  (apiData:dataType) => {

  // Extract relevant data from API response
  const title = apiData.title || 'MUNCH'; // Fallback for missing title
  const description = apiData.description || 'Mobile Utility for Nourishing Campus Hunger'; // Fallback
  const image = apiData.imgUrl || '/images/logo_with_bg.png'; // Optional image

  // Construct meta tags object based on SEO best practices
  const metaTags = {
    title: title,
    description: description.slice(0, 155) + '...', // Truncate to 155 chars for better SEO
    'og:title': title,
    'og:description': description.slice(0, 155) + '...',
    'og:image': image,
    'twitter:title': title,
    'twitter:description': description.slice(0, 155) + '...',
    'twitter:image': image,
  };

  // Handle dynamic URLs for social sharing links (optional)
//   if (router.asPath) {
//     const url = `https://your-website.com${router.asPath}`;
//     metaTags['og:url'] = url;
//     metaTags['twitter:url'] = url;
//   }

  return metaTags;
};

export default generateMetaTags;
