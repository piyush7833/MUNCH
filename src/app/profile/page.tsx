import React from 'react'
import { error } from 'console';

const apiUrl = process.env.BASEURL;
const getData=async()=>{
  const res=await fetch(`${apiUrl}/profile`,{
    cache:"no-store",

  })
  if(!res.ok){
    console.log(error);
    throw new Error("Something went wrong ")
  }
  return res.json();
}
const profile = async() => {
  const data:any=await getData();
  console.log(data)
  return (
    <div>profile</div>
  )
}

export default profile