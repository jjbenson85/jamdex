import React from 'react'

import SelectNotes from './SelectNotes'

const InterfaceAlpha = ({ owned_synths, handleSelect }) => {
  return (
    owned_synths[0].beats.map((note, i) =>
      <SelectNotes
        key={i}
        note={note}
        handleSelect={handleSelect}
        i={i}
        rangeMin="0"
        rangeMax="35"
      />
    )
  )
}

export default InterfaceAlpha
