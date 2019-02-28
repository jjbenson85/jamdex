import React from 'react'

import noteRangeLookup from '../../lib/noteRangeLookup'

const InterfaceBeta = ({ currentBeat, owned_synths, handleChange, playing }) => {

  return(
    <div className="column">
      {owned_synths[0].beats.map((note, i) =>
        <div key={i} className="bar-container">
          <div
            style={
              { height: `calc((${noteRangeLookup.indexOf(note.pitch)}/36)*100%)`}
            }
            className={`inner-bar ${currentBeat===i && playing ? 'current':''}`}
          >
          </div>
          <input
            type="range"
            orient="vertical"
            name="pitch"
            min="0"
            max="35"
            value={noteRangeLookup.indexOf(note.pitch)}
            onChange={(e) => {
              handleChange(e, i)
            }
            }
          />
        </div>
      )}
    </div>
  )
}

export default InterfaceBeta
