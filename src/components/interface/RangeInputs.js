import React from 'react'

// import noteRangeLookup from '../../lib/noteRangeLookup'

const RangeInputs = ({ currentBeat, handleChange, playing, rangeMin, rangeMax, values }) => {
  const max = parseInt(rangeMax)
  // console.log('values', values)
  // console.log('beats[0].note.pitch', beats[0].pitch)
  // console.log('beats', noteRangeLookup.indexOf(beats[0].pitch))
  if(!values)return null
  return(
    <div className="column">
      {values.map((value, i) =>
        <div key={i} className="bar-container">
          <div
            style={
              { height: `calc((${value}/${(max)+1})*100%)`}
            }
            className={`inner-bar ${currentBeat===i && playing ? 'current':''}`}
          >
          </div>
          <input
            type="range"
            orient="vertical"
            name="slider"
            min={rangeMin}
            max={rangeMax}
            value={value}
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

export default RangeInputs
