"use client"
import React from 'react'
import Link from 'next/link';
import { Edit } from '@mui/icons-material'
const EditButton = ({ url }: { url: string }) => {
  return (
    <div>
      <Link href={url} passHref className='bg-red-500 p-2 text-white rounded-full absolute bottom-3 right-16' >
        {/* <a> */}
          <Edit />
        {/* </a> */}
      </Link>
    </div>
  )
}

export default EditButton
