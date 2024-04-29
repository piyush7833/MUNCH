import Items from '../components/homePage/Items'
import Offer from '../components/homePage/Offer'
import Slider from '../components/homePage/Slider'
import Store from '../components/homePage/Store'

export const metadata = {
  title: 'MUNCH',
  description: 'Mobile Utility for Nourishing Campus Hunger',
  openGraph: {
    images: ['/images/logo_with_bg.png'],
  },
}
export default function Home() {
  return (
    <div className='bg-inherit hideScrollBar'>
      <Slider/>
      <Offer/>
      <Items/>
      <Store/>
    </div>
  )
}
