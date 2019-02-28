import React from 'react'

import RangeInputs from './RangeInputs'

const InterfaceBeta = ({ id, currentBeat, currentPitch, playing, handleChange, beats }) => {
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
        handleChange={(e, i) => handleChange(e, i, id)}
      />
    </div>
  )
}

export default InterfaceBeta
