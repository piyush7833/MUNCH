import React from 'react'
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
const ModeBtn = (props:{theme:boolean,setTheme:any}) => {
  return (
    <div>
        <div className="mx-2" onClick={()=>{props.setTheme(!props.theme)}}  >{props.theme==true?<LightModeIcon/>:<ModeNightIcon/>}</div>
    </div>
  )
}

export default ModeBtn
