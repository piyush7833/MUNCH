"use client"
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { userAuthStore } from '@/utils/userStore';
import ConfirmDialog from '../common/ConfirmDialog';
import { httpservice } from '@/utils/httpService';
const DeleteButton = ({ url, userId }: { url: string, userId: string }) => {
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter()
  const { userName, id,role } = userAuthStore();
  if (!userName  || (userId && userId !== id) && role !== 'Admin') {
    return
  }
  const handleDelete = async () => {
    try {
      const response = await httpservice.delete(url)
      toast.success(response.data.message);
      router.push('/')
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete?"
      />
      <button className='bg-red-500 p-2 text-white rounded-full hover:bg-gray-400 ' onClick={() => setConfirmOpen(true)}><DeleteIcon /></button>
    </div>
  )
}

export default DeleteButton
