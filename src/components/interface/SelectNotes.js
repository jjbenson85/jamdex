import React from 'react'

const SelectNotes = ({ note, handleSelect, i }) => {
  return (
    <div>
      <select
        id={`select-note-${i}`}
        value={note.pitch.substring(0, note.pitch.length - 1)}
        onChange={(e) => {
          handleSelect(e, i)
        }}
      >
        <option value='A'>A</option>
        <option value='A#'>A#</option>
        <option value='B'>B</option>
        <option value='C'>C</option>
        <option value='C#'>C#</option>
        <option value='D'>D</option>
        <option value='D#'>D#</option>
        <option value='E'>E</option>
        <option value='F'>F</option>
        <option value='F#'>F#</option>
        <option value='G'>G</option>
        <option value='G#'>G#</option>
      </select>
      <select
        id={`select-octave-${i}`}
        value={note.pitch.substring(note.pitch.length - 1)}
        onChange={(e) => {
          handleSelect(e, i)
        }
        }
      >
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
      </select>
    </div>
  )
}

export default SelectNotes
