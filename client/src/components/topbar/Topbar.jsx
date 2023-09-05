import React from 'react'
import "./topbar.css"

import MoreVertIcon from '@mui/icons-material/MoreVert';

const Topbar = () => {
  return (
    <div className='topbar'>
    <div className="topbarWrapper">
    <div className="topbarImgAndName">
        <img className="topbarImg" src="../../assets/indianrailwayslogo.png" alt="" />
        <span className='topbarName'>IREPS</span>
    </div>
    </div>
    <div className="topbarOptions">
    <MoreVertIcon sx={{height:32}}/>
    </div>
    </div>
  )
}

export default Topbar