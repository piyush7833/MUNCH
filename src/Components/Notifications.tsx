import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import React from 'react'
const Notifications = () => {
  return (
    <div className='h-fit px-4 py-2 flex items-center justify-center from-gradient1 via-orange-400 to-gradient2 bg-gradient-to-r text-white text-sm md:text-base cursor-pointer text-justify'>
       <NotificationsActiveIcon/> <p>No service charge for orders above Rs200</p>
    </div>
  )
}

export default Notifications
