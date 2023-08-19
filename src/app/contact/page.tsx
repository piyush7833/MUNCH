import Image from 'next/image'
import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
const Contact = () => {
  return (
    <div className='p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-5.5rem)] '>
      {/* box */}

      <div className="h-full w-full flex flex-col md:flex-row items-center justify-center">
        {/* img container */}

        <div className="w-full h-1/3 relative md:w-1/2 md:h-full flex ">
          <Image src='/images/contact.png' alt='contact' fill={true} />
        </div>

        {/* form container */}
        <div className="h-2/3 flex items-center justify-center flex-col gap-4 md:w-1/2 md:h-1/2">
          <h1 className=' text-3xl sm:text-4xl md:text-6xl md:mb-8'>Contact Us</h1>
          <div className="inputContainer">
            <EmailIcon />
            <input type="email" name="email" id="email" placeholder='Enter Email' required className='input' />
          </div>
          <div className="inputContainer">
            <MessageIcon />
            <textarea rows={5 } cols={15} placeholder='Enter Message' className='input sm:w-[80vw] md:w-full md:h-[30vh]'/>
          </div>
          <button className='btn w-1/3'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
