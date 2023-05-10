'use client'
import {
  chordParserFactory,
  chordRendererFactory
} from 'chord-symbol/lib/chord-symbol.js' // bundled version
import { useEffect, useRef, useState } from 'react'
import { allNotes } from './notes'

export default function Home () {
  const [chord, setChord] = useState('Cmaj')
  const [speed, setSpeed] = useState(1) // speed by seconds
  const [simpleMode, setSimpleMode] = useState(false) // mode status
  const modeName = simpleMode ? 'Simple Notation' : 'Academic Notation'
  const [chordQueue, setChordQueue] = useState(['Cmaj'])

  useEffect(() => {
    let safeSpeed = speed
    if (safeSpeed < 0.1) {
      safeSpeed = 1
    }
    const interval = setInterval(() => {
      setChord(getRandomChord({ simpleMode }))
    }, safeSpeed * 1000)
    return () => clearInterval(interval)
  }, [speed, simpleMode])

  function onSpeedChange (e) {
    if (isNaN(e.target.value)) {
      return
    }
    setSpeed(e.target.value)
  }

  return (
    <div className='' >
      <div className='h-screen w-screen flex flex-col justify-center items-center'>
        <div className='flex'>
          <div className='text-7xl lg:text-9xl'>
            {chord}
          </div>
        </div>
        <div className='flex items-center m-3'>
          <span>Speed:&nbsp;</span>
          <input className='h-9 p-2 border-2' type="text" id="speed" name="speed" size="4" value={speed} placeholder={speed} onChange={onSpeedChange} />
        </div>
        <button className='bg-black text-white rounded-lg w-48 h-16' onClick={() => setSimpleMode(!simpleMode)}>{modeName}</button>
      </div>
    </div>
  )
}

// get a random chord
function getRandomChord ({ simpleMode }) {
  // console.log("getRandomChord simpleMode:"+ simpleMode)
  const chordNotations = buillAllChordsNotation({ simpleMode })

  const randomIndex = Math.floor(Math.random() * chordNotations.length)
  return chordNotations[randomIndex]
}
function buillAllChordsNotation ({ simpleMode }) {
  // console.log("buillAllChordsNotation simpleMode:" + simpleMode)
  // const parseChord = chordParserFactory();
  // const renderChord = chordRendererFactory({ useShortNamings: true });
  // console.log(renderChord(parseChord("Dbdim")))

  const academicQualities = ['maj', 'min', 'aug', 'dim']
  const simpleQualities = ['', '-', '+', '°']
  const qualities = simpleMode ? simpleQualities : academicQualities
  const chordNotations = []

  for (const note in allNotes) {
    for (const quality of qualities) {
      const n = allNotes[note]
      // const chord = parseChord(`${n}${quality}`);
      // chordNotations.push(renderChord(chord));
      chordNotations.push(`${n}${quality}`)
    }
  }
  return chordNotations
}
