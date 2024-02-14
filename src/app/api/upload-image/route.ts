import { getStorage, ref,uploadBytes, getDownloadURL } from 'firebase/storage';
import { NextRequest, NextResponse } from 'next/server';
import app from '../utils/firebase'
const storage = getStorage(app);
const storageRef = ref(storage, 'images'); // You may adjust the storage path as needed

const uploadSingle=async(file:File)=>{
    const fileName = `${Date.now()}-${file.name}`;
    const fileRef = ref(storageRef, fileName);
    await uploadBytes(fileRef, file).then((snapshot) => {});
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
}
const uploadMultiple=async(files:File[])=>{
  const uploadedImages = [];
  for (const file of files) {
    const fileName = `${Date.now()}-${file.name}`;
    const fileRef = ref(storageRef, fileName);
    await uploadBytes(fileRef, file).then((snapshot) => {});
    const downloadURL = await getDownloadURL(fileRef);
    uploadedImages.push(downloadURL);
  }
  return uploadedImages;
}
export const POST = async (req: NextRequest) => {
  try {
    const data = await req.formData();
    const type=data.get('type')
    console.log(type)
    const files: File[] | null  = data.getAll('file') as unknown as File[];
    if (!files) {
      return NextResponse.json({
        error: true,
        message: 'No file provided',
        status: 400,
      }, { status: 400 });
    }
    var urls;
    if(type=="single"){
      urls=await uploadSingle(files[0])
    }
    else if(type=="multiple"){
      urls=await uploadMultiple(files)
    }
    return NextResponse.json(
      {
        error: false,
        message: 'Images uploaded successfully',
        status: 200,
        imgUrls: urls,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error",error);
    return NextResponse.json(
      {
        error: true,
        message: 'Something went wrong',
        status: 500,
      },
      { status: 500 }
    );
  }
};