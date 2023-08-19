import Items from '../components/Items'
import Offer from '../components/Offer'
import Slider from '../components/Slider'
import Store from '../components/Store'

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
