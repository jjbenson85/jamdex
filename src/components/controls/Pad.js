import React from 'react'

import '../../scss/controls/Pad.scss'

const Pad = (props)=>{
  let classes = 'pad '
  classes+= props.selected?'selected ':''
  classes+= props.current?'current ':''
  switch(props.velocity){
    case '100':
      classes+= 'hard '
      break
    case '70':
      classes+= 'medium '
      break
    case '30':
      classes+= 'soft '
      break
  }

  return(
    <div
      className={classes}
      onClick={props.onClick}
    ></div>
  )
}

export default Pad
