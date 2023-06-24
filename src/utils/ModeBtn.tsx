import React from 'react'
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
const ModeBtn = (props:{theme:boolean,setTheme:boolean}) => {
  return (
    <div>
        <div className="mx-2">{props.theme==true?<LightModeIcon/>:<ModeNightIcon/>}</div>
    </div>
  )
}

export default ModeBtn
