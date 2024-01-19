import Items from '../components/homePage/Items'
import Offer from '../components/homePage/Offer'
import Slider from '../components/homePage/Slider'
import Store from '../components/homePage/Store'

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
