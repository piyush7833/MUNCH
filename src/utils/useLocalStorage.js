import { useState } from "react";

const useLocalStorage=(key,initialValue)=>{
    const [value,setValue]=useState(()=>{
        try {
            const item=window.localStorage.getItem(key);
            return item ? JSON.parse(item):initialValue;
        } catch (error) {
            console.log(error)
        }
    });

    const setLocalValue=(value)=>{
        try {
            window.localStorage.setItem(key,JSON.stringify(value));
            setValue(value);
        } catch (error) {
            console.log(error);
            
        }
    }
    return [value,setLocalValue];
}


export default useLocalStorage;