import axios from 'axios';
import { cookies } from 'next/headers';
export const httpServiceServer={
    get:async (url:string)=>{
        const cookieStore = cookies()
        const cookie = cookieStore.get('token')?.value;
        try {
            const res=await axios.get(`${process.env.BASEURL}/${url}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `token=${cookie}`
                    },
            });
            return res.data;
        } catch (error:any) {
            return (error.response.data || {error:true,message:'Something went wrong'});
        }
    }
}