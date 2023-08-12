import Items from '@/components/Items'
import Offer from '@/components/Offer'
import Slider from '@/components/Slider'
import Store from '@/components/Store'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Slider/>
      <Offer/>
      <Items/>
      <Store/>
    </div>
  )
}
