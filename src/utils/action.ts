import { baseUrl } from "@/baseUrl";
import { httpservice } from "./httpService";
import { toast } from "react-toastify";
export function formatDate(inputDate:string) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const [year, month, day] = inputDate.split('-');
    const monthName = months[parseInt(month, 10) - 1];
  
    return `${parseInt(day, 10)} ${monthName} ${year}`;
  }

  export const handleUploadImage = async (selectedImage:File) => {
    try {
        const formData = new FormData();
        formData.append('file', selectedImage!);
        formData.append('type', "single");
        const imageResponse = await httpservice.post(`${baseUrl}/upload-image`, formData)
        return imageResponse.data.imgUrls;
    } catch (error) {
        toast.error("Image upload failed")
        return null;
    }
}
