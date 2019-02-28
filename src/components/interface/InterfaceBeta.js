import React from 'react'

import RangeInputs from './RangeInputs'

const InterfaceBeta = ({ currentBeat, currentPitch, playing, handleChange, beats }) => {
  return (
    <div className="interfaceBeta">
      <div className="column">
        <div className="pitch-display">
          Pitch <span>{currentPitch}</span>
        </div>
      </div>
      <RangeInputs
        currentBeat={currentBeat}
        beats={beats}
        playing={playing}
        handleChange={handleChange}
      />
    </div>
  )
}

export default InterfaceBeta
